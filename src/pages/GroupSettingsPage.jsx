import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteGroup } from '@/features/groups/api/groupsApi';
import GroupSettingsMenu from '@/features/groups/components/GroupSettingsMenu';
import { useGroupRouteContext } from '@/features/groups/hooks/useGroupRouteContext';
import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';
import DetailPageFrame from '@/shared/components/layout/DetailPageFrame';
import { ROUTES } from '@/shared/constants/routes';

const GroupSettingsPage = () => {
  const navigate = useNavigate();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeletePending, setIsDeletePending] = useState(false);
  const isDeletePendingRef = useRef(false);
  const {
    group,
    permissions,
    roleQuery,
    hasApiData,
    isLoading,
  } = useGroupRouteContext();

  const confirmDelete = async () => {
    if (!group || isDeletePendingRef.current) return;

    isDeletePendingRef.current = true;
    setIsDeletePending(true);

    try {
      if (hasApiData) await deleteGroup(group.groupId);
      navigate(ROUTES.GROUPS, { replace: true });
    } catch {
      // The shared API client handles the error.
    } finally {
      isDeletePendingRef.current = false;
      setIsDeletePending(false);
    }
  };

  if (isLoading) {
    return (
      <DetailPageFrame title="그룹 설정" variant="primary-light">
        <p>그룹 정보를 불러오는 중입니다.</p>
      </DetailPageFrame>
    );
  }

  if (!group || !permissions?.canViewSettings) {
    return (
      <DetailPageFrame title="그룹 설정" variant="primary-light">
        <p>설정 권한이 없습니다.</p>
      </DetailPageFrame>
    );
  }

  return (
    <>
      <DetailPageFrame title="그룹 설정" variant="primary-light">
        <GroupSettingsMenu
          group={group}
          permissions={permissions}
          roleQuery={roleQuery}
          onDelete={() => setIsDeleteConfirmOpen(true)}
        />
      </DetailPageFrame>

      {isDeleteConfirmOpen && (
        <ConfirmModal
          message={`'${group.name}' 그룹을\n제거하시겠습니까?`}
          confirmLabel="그룹 제거"
          isPending={isDeletePending}
          pendingLabel="그룹 제거 중"
          onConfirm={confirmDelete}
          onCancel={() => setIsDeleteConfirmOpen(false)}
        />
      )}
    </>
  );
};

export default GroupSettingsPage;
