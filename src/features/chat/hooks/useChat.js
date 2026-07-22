import { useCallback, useEffect, useRef, useState } from 'react';
import { sendChatQuestion } from '@/features/chat/api/chatApi';

const LOADING_DOTS_INTERVAL_MS = 450;

const useChat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [loadingDotCount, setLoadingDotCount] = useState(3);
  const isPendingRef = useRef(false);
  const nextMessageIdRef = useRef(0);

  const createMessage = useCallback((role, content) => ({
    id: nextMessageIdRef.current++,
    role,
    content,
  }), []);

  useEffect(() => {
    if (!isPending) return undefined;

    const timer = window.setInterval(() => {
      setLoadingDotCount((count) => count % 3 + 1);
    }, LOADING_DOTS_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isPending]);

  const sendMessage = useCallback(async () => {
    const question = input.trim();

    if (!question || isPendingRef.current) return;

    isPendingRef.current = true;
    setIsPending(true);
    setLoadingDotCount(3);
    setInput('');
    setMessages((current) => [
      ...current,
      createMessage('user', question),
    ]);

    try {
      const response = await sendChatQuestion(question);
      const answer = response.data.result?.answer;

      if (typeof answer !== 'string' || !answer.trim()) {
        throw new Error('AI chat response did not include an answer');
      }

      setMessages((current) => [
        ...current,
        createMessage('assistant', answer),
      ]);
    } catch {
      // API 오류 안내는 공용 Axios 클라이언트의 오류 모달에서 처리한다.
    } finally {
      isPendingRef.current = false;
      setIsPending(false);
    }
  }, [createMessage, input]);

  return {
    input,
    isPending,
    loadingDotCount,
    messages,
    sendMessage,
    setInput,
  };
};

export default useChat;
