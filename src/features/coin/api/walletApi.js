import { apiClient } from '@/shared/api/apiClient';

export const getMyWalletBalance = (signal) => (
  apiClient.get('/wallet/me', { signal })
);
