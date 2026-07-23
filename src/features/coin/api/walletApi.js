import { apiClient } from '@/shared/api/apiClient';

export const getMyWalletBalance = (signal) => (
  apiClient.get('/wallet/me', { signal })
);

export const getWalletRankings = ({ limit, signal }) => (
  apiClient.get('/wallet/rankings', {
    params: { limit },
    signal,
  })
);
