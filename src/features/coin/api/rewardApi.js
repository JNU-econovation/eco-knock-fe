import { apiClient } from '@/shared/api/apiClient';

export const getMyRewardHistory = ({ page, size, signal }) => (
  apiClient.get('/rewards/me/history', {
    params: { page, size },
    signal,
  })
);
