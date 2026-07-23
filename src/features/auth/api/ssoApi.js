import {
  API_BASE_URL,
  DEFAULT_API_BASE_URL,
} from '@/shared/api/apiClient';

export const startSsoLogin = (redirectUrl) => {
  const ssoBaseUrl = /^https?:\/\//i.test(API_BASE_URL)
    ? API_BASE_URL
    : DEFAULT_API_BASE_URL;
  const loginUrl = new URL('/sso/login', ssoBaseUrl);
  loginUrl.searchParams.set('redirect', redirectUrl);
  window.location.assign(loginUrl.toString());
};
