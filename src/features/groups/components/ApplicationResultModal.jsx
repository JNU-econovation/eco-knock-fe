import { useEffect, useRef } from 'react';
import './ApplicationResultModal.css';

const ApplicationResultModal = ({ result, onClose }) => {
  const confirmButtonRef = useRef(null);
  const decisionText = result.decision === 'accept'
    ? '수락하였습니다.'
    : '거절하였습니다.';

  useEffect(() => {
    confirmButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="application-result-modal__backdrop">
      <section
        className="application-result-modal"
        role="alertdialog"
        aria-modal="true"
      >
        <p>
          '{result.applicantName}'님의 지원을
          <br />
          {decisionText}
        </p>
        <button ref={confirmButtonRef} type="button" onClick={onClose}>
          확인
        </button>
      </section>
    </div>
  );
};

export default ApplicationResultModal;
