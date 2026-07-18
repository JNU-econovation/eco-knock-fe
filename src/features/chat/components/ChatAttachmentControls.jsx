import { useRef, useState } from 'react';
import {
  ChatFileAttachmentIcon,
  ChatPhotoAttachmentIcon,
} from '@/assets/icons/ChatOverlayIcons';
import {
  FILE_ATTACH_LABEL,
  PHOTO_ATTACH_LABEL,
} from '@/features/chat/constants/chatText';
import ChatAttachmentNotice from './ChatAttachmentNotice';

const ChatAttachmentControls = () => {
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const attachmentTriggerRef = useRef(null);

  const handleOpenNotice = (event) => {
    attachmentTriggerRef.current = event.currentTarget;
    setIsNoticeOpen(true);
  };

  const handleConfirmNotice = () => {
    setIsNoticeOpen(false);
    attachmentTriggerRef.current?.focus();
  };

  return (
    <div className="chat-overlay__attachment-area">
      {isNoticeOpen && (
        <ChatAttachmentNotice onConfirm={handleConfirmNotice} />
      )}

      <div className="chat-overlay__attachment-row">
        <button
          className="chat-overlay__attachment-button"
          type="button"
          aria-label={PHOTO_ATTACH_LABEL}
          onClick={handleOpenNotice}
        >
          <ChatPhotoAttachmentIcon />
        </button>
        <button
          className="chat-overlay__attachment-button"
          type="button"
          aria-label={FILE_ATTACH_LABEL}
          onClick={handleOpenNotice}
        >
          <ChatFileAttachmentIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatAttachmentControls;
