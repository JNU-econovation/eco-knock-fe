import { useEffect, useRef } from 'react';
import './CollectionDeleteModal.css';

const CollectionDeleteModal = ({
  itemName,
  onConfirm,
  onCancel,
}) => {
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    cancelButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCancel]);

  return (
    <div
      className="collection-delete-modal__backdrop"
      onClick={onCancel}
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
          >
            삭제
          </button>
          <button
            ref={cancelButtonRef}
            className="collection-delete-modal__button"
            type="button"
            onClick={onCancel}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionDeleteModal;
