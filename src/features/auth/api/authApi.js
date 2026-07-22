import { apiClient, plainApiClient } from '@/shared/api/apiClient';

const PUBLIC_AUTH_REQUEST = { skipAuthRefresh: true };

export const loginAsGuest = () => (
  apiClient.post('/auth/guest', undefined, PUBLIC_AUTH_REQUEST)
);

export const loginAsAdmin = (password) => (
  apiClient.post('/auth/admin', { password }, PUBLIC_AUTH_REQUEST)
);

export const reissueToken = () => plainApiClient.post('/auth/reissue');

export const logout = () => (
  apiClient.post('/auth/logout', undefined, PUBLIC_AUTH_REQUEST)
);
