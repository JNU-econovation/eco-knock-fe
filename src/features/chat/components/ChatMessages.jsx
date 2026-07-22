import { useEffect, useRef } from 'react';
import { CHAT_LOADING_TEXT } from '@/features/chat/constants/chatText';

const ChatMessages = ({ messages, isPending, loadingDotCount }) => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [isPending, messages]);

  return (
    <div
      className="chat-overlay__messages"
      aria-live="polite"
      aria-busy={isPending}
    >
      {messages.map((message) => (
        <div
          key={message.id}
          className={`chat-overlay__message chat-overlay__message--${message.role}`}
        >
          {message.content}
        </div>
      ))}

      {isPending && (
        <div className="chat-overlay__message chat-overlay__message--assistant">
          {CHAT_LOADING_TEXT}{'.'.repeat(loadingDotCount)}
          <br />
          <span aria-hidden="true">😊</span>
        </div>
      )}
      <div ref={endRef} aria-hidden="true" />
    </div>
  );
};

export default ChatMessages;
