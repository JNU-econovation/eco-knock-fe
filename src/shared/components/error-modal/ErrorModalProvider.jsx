import { useCallback, useMemo, useRef, useState } from 'react';
import { ErrorModalContext } from '@/shared/contexts/ErrorModalContext';
import ErrorModal from './ErrorModal';

const DEFAULT_ERROR_MESSAGE = '알 수 없는 오류가 발생했습니다.';

const ErrorModalProvider = ({ children }) => {
  const [errorQueue, setErrorQueue] = useState([]);
  const nextErrorIdRef = useRef(0);

  const showError = useCallback((error = {}) => {
    const errorId = nextErrorIdRef.current;
    nextErrorIdRef.current += 1;
    const isMessageOnly = typeof error === 'string';
    const message = isMessageOnly ? error : error.message;
    const errorCode = isMessageOnly ? null : error.errorCode;

    return new Promise((resolve) => {
      setErrorQueue((currentQueue) => [
        ...currentQueue,
        {
          id: errorId,
          message: message || DEFAULT_ERROR_MESSAGE,
          errorCode: errorCode || null,
          resolve,
        },
      ]);
    });
  }, []);

  const hideError = useCallback(() => {
    setErrorQueue((currentQueue) => {
      const [currentError, ...remainingErrors] = currentQueue;
      currentError?.resolve();
      return remainingErrors;
    });
  }, []);

  const contextValue = useMemo(() => ({
    showError,
    hideError,
  }), [hideError, showError]);

  const currentError = errorQueue[0];

  return (
    <ErrorModalContext.Provider value={contextValue}>
      {children}
      {currentError && (
        <ErrorModal
          message={currentError.message}
          errorCode={currentError.errorCode}
          onDismiss={hideError}
        />
      )}
    </ErrorModalContext.Provider>
  );
};

export default ErrorModalProvider;
