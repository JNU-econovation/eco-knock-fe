import { apiClient } from '@/shared/api/apiClient';

export const sendChatQuestion = (question) => (
  apiClient.post('/ai/chat', { question })
);

export const getChatHistory = ({ limit, before, signal }) => (
  apiClient.get('/ai/chat/history', {
    params: {
      limit,
      ...(before ? { before } : {}),
    },
    signal,
  })
);
