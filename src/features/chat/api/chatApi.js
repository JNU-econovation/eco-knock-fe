import { apiClient } from '@/shared/api/apiClient';

export const sendChatQuestion = (question) => {
  const formData = new FormData();
  formData.append('question', question);

  return apiClient.post('/ai/chat', formData);
};
