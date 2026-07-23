import axios from 'axios';

export const DEFAULT_API_BASE_URL = 'https://eco-knock.isek-ai.org';
const UNKNOWN_ERROR_MESSAGE = '알 수 없는 오류가 발생했습니다.';

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL
).replace(/\/+$/, '');

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const plainApiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

let clientHandlers = null;
let refreshPromise = null;
let unauthorizedFlowPromise = null;
let forbiddenFlowPromise = null;
const pendingErrorModalPromises = new Map();

export const getApiErrorDetails = (error) => {
  const status = error.response?.status;
  const backendMessage = error.response?.data?.message;
  const backendErrorCode = error.response?.data?.errorCode;
  const message = (
    status >= 400 &&
    status < 500 &&
    typeof backendMessage === 'string' &&
    backendMessage.trim()
  )
    ? backendMessage
    : UNKNOWN_ERROR_MESSAGE;
  const errorCode = (
    typeof backendErrorCode === 'string' && backendErrorCode.trim()
  )
    ? backendErrorCode.trim()
    : status >= 400 && status < 600 ? `HTTP ${status}` : null;

  return { message, errorCode };
};

export const configureApiClient = (handlers) => {
  clientHandlers = handlers;

  return () => {
    if (clientHandlers === handlers) clientHandlers = null;
  };
};

const showRequestError = (error) => {
  const errorDetails = getApiErrorDetails(error);
  const errorKey = errorDetails.errorCode;

  if (!clientHandlers?.showError) return Promise.resolve();

  if (!errorKey) {
    return clientHandlers.showError(errorDetails);
  }

  if (!pendingErrorModalPromises.has(errorKey)) {
    const modalPromise = Promise.resolve(
      clientHandlers.showError(errorDetails),
    ).finally(() => {
      if (pendingErrorModalPromises.get(errorKey) === modalPromise) {
        pendingErrorModalPromises.delete(errorKey);
      }
    });

    pendingErrorModalPromises.set(errorKey, modalPromise);
  }

  return pendingErrorModalPromises.get(errorKey);
};

const handleUnauthorized = (error) => {
  if (!unauthorizedFlowPromise) {
    unauthorizedFlowPromise = (async () => {
      await showRequestError(error);
      clientHandlers?.onUnauthorized();
    })().finally(() => {
      unauthorizedFlowPromise = null;
    });
  }

  return unauthorizedFlowPromise;
};

const handleForbidden = (error) => {
  if (!forbiddenFlowPromise) {
    forbiddenFlowPromise = (async () => {
      await showRequestError(error);
      clientHandlers?.onForbidden();
    })().finally(() => {
      forbiddenFlowPromise = null;
    });
  }

  return forbiddenFlowPromise;
};

const refreshAccessToken = () => {
  if (!refreshPromise) {
    const reissueRequest = clientHandlers?.reissueToken();
    refreshPromise = (reissueRequest ?? Promise.reject(
      new Error('API client is not configured'),
    )).finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isCancel(error)) return Promise.reject(error);

    const requestConfig = error.config ?? {};
    const isUnauthorized = error.response?.status === 401;
    const canRefresh = isUnauthorized && !requestConfig.skipAuthRefresh;
    const isForbiddenPageRequest = (
      error.response?.status === 403 &&
      requestConfig.method?.toLowerCase() === 'get'
    );

    if (canRefresh && !requestConfig.hasRetriedAfterRefresh) {
      requestConfig.hasRetriedAfterRefresh = true;

      try {
        await refreshAccessToken();
        return apiClient(requestConfig);
      } catch (refreshError) {
        await handleUnauthorized(refreshError);
        return Promise.reject(error);
      }
    }

    if (canRefresh) {
      await handleUnauthorized(error);
      return Promise.reject(error);
    }

    if (isForbiddenPageRequest) {
      await handleForbidden(error);
      return Promise.reject(error);
    }

    await showRequestError(error);
    return Promise.reject(error);
  },
);
