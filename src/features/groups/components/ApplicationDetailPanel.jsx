import { useEffect, useRef } from 'react';
import './ApplicationDetailPanel.css';

const ApplicationDetailPanel = ({
  application,
  canManage,
  onClose,
  onReject,
  onAccept,
}) => {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="application-detail-panel__backdrop"
      onClick={onClose}
    >
      <section
        className="application-detail-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-detail-name"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          className="application-detail-panel__close"
          type="button"
          aria-label="지원서 닫기"
          onClick={onClose}
        >
          ×
        </button>

        <h2
          className="application-detail-panel__name"
          id="application-detail-name"
        >
          {application.applicantName}
        </h2>
        <p className="application-detail-panel__message">
          {application.message}
        </p>

        {canManage && (
          <div className="application-detail-panel__actions">
            <button
              className="application-detail-panel__button application-detail-panel__button--reject"
              type="button"
              onClick={onReject}
            >
              지원 거절
            </button>
            <button
              className="application-detail-panel__button application-detail-panel__button--accept"
              type="button"
              onClick={onAccept}
            >
              지원 수락
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ApplicationDetailPanel;
