import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getChatHistory,
  sendChatQuestion,
} from '@/features/chat/api/chatApi';
import { mapChatHistoryToMessages } from '@/features/chat/utils/chatHistory';

const LOADING_DOTS_INTERVAL_MS = 450;
const CHAT_HISTORY_LIMIT = 20;

const useChat = ({ isOpen, onForbidden }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isHistoryPending, setIsHistoryPending] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [loadingDotCount, setLoadingDotCount] = useState(3);
  const hasLoadedHistoryRef = useRef(false);
  const historyRequestIdRef = useRef(0);
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

  useEffect(() => {
    if (!isOpen || hasLoadedHistoryRef.current) return undefined;

    const controller = new AbortController();
    const requestId = historyRequestIdRef.current + 1;
    historyRequestIdRef.current = requestId;

    const loadHistory = async () => {
      setIsHistoryPending(true);

      try {
        const response = await getChatHistory({
          limit: CHAT_HISTORY_LIMIT,
          signal: controller.signal,
        });
        const items = response.data.result?.items;

        if (!Array.isArray(items)) {
          throw new Error('AI chat history response did not include items');
        }

        setMessages(mapChatHistoryToMessages(items));
        hasLoadedHistoryRef.current = true;
      } catch (error) {
        if (error.response?.status === 403) {
          onForbidden();
        }

        // API 오류 안내는 공용 Axios 클라이언트의 오류 모달에서 처리한다.
      } finally {
        if (historyRequestIdRef.current === requestId) {
          setIsHistoryPending(false);
        }
      }
    };

    loadHistory();

    return () => controller.abort();
  }, [isOpen, onForbidden]);

  const sendMessage = useCallback(async () => {
    const question = input.trim();

    if (!question || isHistoryPending || isPendingRef.current) return;

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
  }, [createMessage, input, isHistoryPending]);

  return {
    input,
    isHistoryPending,
    isPending,
    loadingDotCount,
    messages,
    sendMessage,
    setInput,
  };
};

export default useChat;
