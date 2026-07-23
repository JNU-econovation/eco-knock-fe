import { API_BASE_URL } from '@/shared/api/apiClient';

export const startSsoLogin = (redirectUrl) => {
  const loginUrl = new URL(
    `${API_BASE_URL}/sso/login`,
    window.location.origin,
  );
  loginUrl.searchParams.set('redirect', redirectUrl);
  window.location.assign(loginUrl.toString());
};
