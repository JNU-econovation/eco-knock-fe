import { useEffect, useRef } from 'react';
import './ErrorModal.css';

const ErrorModal = ({ message, errorCode, onDismiss }) => {
  const confirmButtonRef = useRef(null);

  useEffect(() => {
    confirmButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onDismiss();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [message, onDismiss]);

  return (
    <div
      className="error-modal__backdrop"
      onClick={onDismiss}
    >
      <div
        className="error-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="error-modal-message"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="error-modal__details">
          <p id="error-modal-message" className="error-modal__message">
            Error: {message}
          </p>
          {errorCode && (
            <p className="error-modal__error-code">{errorCode}</p>
          )}
        </div>
        <button
          ref={confirmButtonRef}
          className="error-modal__confirm-button"
          type="button"
          onClick={onDismiss}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
