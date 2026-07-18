import { useEffect, useRef } from 'react';
import {
  ATTACHMENT_NOTICE_CONFIRM_LABEL,
  ATTACHMENT_NOTICE_MESSAGE,
} from '@/features/chat/constants/chatText';
import './ChatAttachmentNotice.css';

const ChatAttachmentNotice = ({ onConfirm }) => {
  const confirmButtonRef = useRef(null);

  useEffect(() => {
    confirmButtonRef.current?.focus();
  }, []);

  return (
    <div
      className="chat-attachment-notice"
      role="dialog"
      aria-labelledby="chat-attachment-notice-message"
    >
      <p
        id="chat-attachment-notice-message"
        className="chat-attachment-notice__message"
      >
        {ATTACHMENT_NOTICE_MESSAGE}
      </p>
      <button
        ref={confirmButtonRef}
        className="chat-attachment-notice__confirm-button"
        type="button"
        onClick={onConfirm}
      >
        {ATTACHMENT_NOTICE_CONFIRM_LABEL}
      </button>
    </div>
  );
};

export default ChatAttachmentNotice;
