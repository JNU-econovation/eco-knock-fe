import { useEffect, useId, useRef } from 'react';
import ButtonSpinner from '@/shared/components/button-spinner/ButtonSpinner';
import './ConfirmModal.css';

const ConfirmModal = ({
  message,
  confirmLabel = '확인',
  cancelLabel = '취소',
  isPending = false,
  pendingLabel = '처리 중',
  confirmVariant = 'danger',
  cancelVariant = 'default',
  onConfirm,
  onCancel,
}) => {
  const messageId = useId();
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    cancelButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !isPending) onCancel();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPending, onCancel]);

  const handleBackdropClick = () => {
    if (!isPending) onCancel();
  };

  return (
    <div className="confirm-modal__backdrop" onClick={handleBackdropClick}>
      <div
        className="confirm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={messageId}
        onClick={(event) => event.stopPropagation()}
      >
        <p id={messageId} className="confirm-modal__message">
          {message}
        </p>

        <div className="confirm-modal__actions">
          <button
            className={
              `confirm-modal__button confirm-modal__button--confirm ` +
              `confirm-modal__button--${confirmVariant}`
            }
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            aria-busy={isPending}
            aria-label={isPending ? pendingLabel : undefined}
          >
            {isPending ? <ButtonSpinner /> : confirmLabel}
          </button>
          <button
            ref={cancelButtonRef}
            className={
              `confirm-modal__button ` +
              `confirm-modal__button--cancel-${cancelVariant}`
            }
            type="button"
            onClick={onCancel}
            disabled={isPending}
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
