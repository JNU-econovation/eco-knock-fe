import { useEffect, useRef } from 'react';
import './CollectionDeleteModal.css';

const CollectionDeleteModal = ({
  itemName,
  isRemoving,
  onConfirm,
  onCancel,
}) => {
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    cancelButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !isRemoving) {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRemoving, onCancel]);

  const handleBackdropClick = () => {
    if (!isRemoving) {
      onCancel();
    }
  };

  return (
    <div
      className="collection-delete-modal__backdrop"
      onClick={handleBackdropClick}
    >
      <div
        className="collection-delete-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="collection-delete-modal-message"
        onClick={(event) => event.stopPropagation()}
      >
        <p
          id="collection-delete-modal-message"
          className="collection-delete-modal__message"
        >
          어플에서 ‘{itemName}’ 링크를
          <br />
          제거하겠습니까?
        </p>

        <div className="collection-delete-modal__actions">
          <button
            className="collection-delete-modal__button collection-delete-modal__button--delete"
            type="button"
            onClick={onConfirm}
            disabled={isRemoving}
            aria-busy={isRemoving}
            aria-label={isRemoving ? '삭제 중' : undefined}
          >
            {isRemoving ? (
              <span
                className="collection-delete-modal__spinner"
                aria-hidden="true"
              />
            ) : '삭제'}
          </button>
          <button
            ref={cancelButtonRef}
            className="collection-delete-modal__button"
            type="button"
            onClick={onCancel}
            disabled={isRemoving}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionDeleteModal;
