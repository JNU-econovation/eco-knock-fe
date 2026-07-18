import {
  ChatChevronDownIcon,
  ChatSendIcon,
} from '@/assets/icons/ChatOverlayIcons';
import chatBackgroundImage from '@/assets/img/eco-knock_AI_chat_bg.png';
import {
  CHAT_LABEL,
  CHAT_PLACEHOLDER,
  CLOSE_LABEL,
  SEND_LABEL,
} from '@/features/chat/constants/chatText';
import useChatOverlayDrag from '@/features/chat/hooks/useChatOverlayDrag';
import ChatAttachmentControls from './ChatAttachmentControls';
import './ChatOverlay.css';

const ChatOverlay = ({ isOpen, onClose }) => {
  const { sheetRef, headerPointerHandlers } = useChatOverlayDrag({
    isOpen,
    onClose,
  });

  return (
    <div
      className={`chat-overlay ${isOpen ? 'chat-overlay--open' : ''}`}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      <div className="chat-overlay__dim" aria-hidden="true" />

      <section
        ref={sheetRef}
        className="chat-overlay__sheet"
        role="dialog"
        aria-modal={isOpen ? 'true' : undefined}
        aria-label={CHAT_LABEL}
      >
        <header className="chat-overlay__header" {...headerPointerHandlers}>
          <button
            className="chat-overlay__close-button"
            type="button"
            aria-label={CLOSE_LABEL}
            onClick={onClose}
          >
            <ChatChevronDownIcon />
          </button>
        </header>

        <div className="chat-overlay__body">
          <img
            className="chat-overlay__background-image"
            src={chatBackgroundImage}
            alt=""
          />
        </div>

        <footer className="chat-overlay__footer">
          <ChatAttachmentControls key={isOpen ? 'open' : 'closed'} />

          <form
            className="chat-overlay__input-row"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              className="chat-overlay__input"
              type="text"
              placeholder={CHAT_PLACEHOLDER}
            />
            <button
              className="chat-overlay__send-button"
              type="submit"
              aria-label={SEND_LABEL}
            >
              <ChatSendIcon />
            </button>
          </form>
        </footer>
      </section>
    </div>
  );
};

export default ChatOverlay;
