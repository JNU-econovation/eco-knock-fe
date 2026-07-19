import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';

const CollectionDeleteModal = ({
  itemName,
  isRemoving,
  onConfirm,
  onCancel,
}) => (
  <ConfirmModal
    message={`어플에서 ‘${itemName}’ 링크를\n제거하겠습니까?`}
    confirmLabel="삭제"
    cancelLabel="취소"
    isPending={isRemoving}
    pendingLabel="삭제 중"
    onConfirm={onConfirm}
    onCancel={onCancel}
  />
);

export default CollectionDeleteModal;
