import { useEffect, useRef } from 'react';
import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';
import { useGroupApplicationForm } from '@/features/groups/hooks/useGroupApplicationForm';
import './GroupApplicationFormPanel.css';

const GroupApplicationFormPanel = ({
  group,
  applicantName,
  onClose,
  onSubmitted,
}) => {
  const closeButtonRef = useRef(null);
  const {
    message,
    setMessage,
    isConfirmOpen,
    openConfirm,
    closeConfirm,
  } = useGroupApplicationForm();

  useEffect(() => {
    if (!isConfirmOpen) closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !isConfirmOpen) onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isConfirmOpen, onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();
    openConfirm();
  };

  return (
    <>
      <div
        className="group-application-form-panel__backdrop"
        onClick={onClose}
      >
        <form
          className="group-application-form-panel"
          onSubmit={handleSubmit}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            ref={closeButtonRef}
            className="group-application-form-panel__close"
            type="button"
            aria-label="지원서 닫기"
            onClick={onClose}
          >
            ×
          </button>
          <input
            className="group-application-form-panel__name"
            value={applicantName}
            aria-label="지원자 이름"
            readOnly
          />
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="지원서를 작성하세요."
            maxLength={500}
            required
          />
          <button
            className="group-application-form-panel__submit"
            type="submit"
          >
            지원서 제출
          </button>
        </form>
      </div>

      {isConfirmOpen && (
        <ConfirmModal
          message={`'${group.name}'에 지원서를\n제출하시겠습니까?`}
          confirmLabel="지원서 제출"
          cancelLabel="취소"
          confirmVariant="primary"
          cancelVariant="danger"
          onConfirm={onSubmitted}
          onCancel={closeConfirm}
        />
      )}
    </>
  );
};

export default GroupApplicationFormPanel;
