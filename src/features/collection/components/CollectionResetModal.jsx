import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';

const CollectionResetModal = ({ onConfirm, onCancel }) => (
  <ConfirmModal
    message={`모아두기 링크를 원래대로 복원하겠습니까?
해당 작업은 실행 취소할 수 없습니다.`}
    confirmLabel="복원"
    cancelLabel="취소"
    onConfirm={onConfirm}
    onCancel={onCancel}
  />
);

export default CollectionResetModal;
