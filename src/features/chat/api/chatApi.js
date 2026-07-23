import { apiClient } from '@/shared/api/apiClient';

export const sendChatQuestion = (question) => (
  apiClient.post('/ai/chat', { question })
);
