import { useEffect, useId, useRef } from 'react';
import {
  DEVELOPMENT_NOTICE_CONFIRM_LABEL,
  DEVELOPMENT_NOTICE_MESSAGE,
} from '@/shared/constants/developmentNotice';
import './DevelopmentNotice.css';

const DevelopmentNotice = ({
  message = DEVELOPMENT_NOTICE_MESSAGE,
  confirmLabel = DEVELOPMENT_NOTICE_CONFIRM_LABEL,
  onConfirm,
}) => {
  const messageId = useId();
  const confirmButtonRef = useRef(null);

  useEffect(() => {
    confirmButtonRef.current?.focus();
  }, []);

  return (
    <div
      className="development-notice"
      role="dialog"
      aria-labelledby={messageId}
    >
      <p id={messageId} className="development-notice__message">
        {message}
      </p>
      <button
        ref={confirmButtonRef}
        className="development-notice__confirm-button"
        type="button"
        onClick={onConfirm}
      >
        {confirmLabel}
      </button>
    </div>
  );
};

export default DevelopmentNotice;
