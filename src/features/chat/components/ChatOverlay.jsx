import {
  ChatChevronDownIcon,
  ChatFileAttachmentIcon,
  ChatPhotoAttachmentIcon,
  ChatSendIcon,
} from '@/assets/icons/ChatOverlayIcons';
import chatBackgroundImage from '@/assets/img/eco-knock_AI_chat_bg.png';
import useChatOverlayDrag from '@/features/chat/hooks/useChatOverlayDrag';
import './ChatOverlay.css';

const CHAT_LABEL = '에코노 AI 채팅';
const CLOSE_LABEL = '채팅창 닫기';
const PHOTO_ATTACH_LABEL = '사진 파일 첨부';
const FILE_ATTACH_LABEL = '파일 첨부';
const SEND_LABEL = '메시지 보내기';
const CHAT_PLACEHOLDER = '에코노 차은우가 누구야?';

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
          <div className="chat-overlay__attachment-row">
            <button
              className="chat-overlay__attachment-button"
              type="button"
              aria-label={PHOTO_ATTACH_LABEL}
            >
              <ChatPhotoAttachmentIcon />
            </button>
            <button
              className="chat-overlay__attachment-button"
              type="button"
              aria-label={FILE_ATTACH_LABEL}
            >
              <ChatFileAttachmentIcon />
            </button>
          </div>

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
