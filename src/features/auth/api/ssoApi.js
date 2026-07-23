import { API_BASE_URL } from '@/shared/api/apiClient';

export const startSsoLogin = (redirectUrl) => {
  const loginUrl = new URL('/sso/login', API_BASE_URL);
  loginUrl.searchParams.set('redirect', redirectUrl);
  window.location.assign(loginUrl.toString());
};
