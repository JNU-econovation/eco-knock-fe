import { apiClient } from '@/shared/api/apiClient';

export const getMyProfile = (signal) => (
  apiClient.get('/profile', { signal })
);
