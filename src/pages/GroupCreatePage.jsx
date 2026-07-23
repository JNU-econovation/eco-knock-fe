import { useRef, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { createGroup } from '@/features/groups/api/groupsApi';
import GroupCreateForm from '@/features/groups/components/GroupCreateForm';
import { toCreateGroupPayload } from '@/features/groups/utils/groupContract';
import DetailPageFrame from '@/shared/components/layout/DetailPageFrame';
import { ROUTES } from '@/shared/constants/routes';
import './GroupCreatePage.css';

const GroupCreatePage = () => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const isPendingRef = useRef(false);

  const handleCreate = async (form) => {
    if (isPendingRef.current) return;

    isPendingRef.current = true;
    setIsPending(true);

    try {
      const response = await createGroup(toCreateGroupPayload(form));
      const groupId = response.data.result?.groupId;

      navigate(
        groupId
          ? generatePath(ROUTES.GROUP_DETAIL, { groupId })
          : ROUTES.GROUPS,
        { replace: true },
      );
    } catch {
      // The shared API client handles the error.
    } finally {
      isPendingRef.current = false;
      setIsPending(false);
    }
  };

  return (
    <DetailPageFrame
      title="그룹 만들기"
      className="group-create-page"
    >
      <GroupCreateForm
        onSubmit={handleCreate}
        isPending={isPending}
      />
    </DetailPageFrame>
  );
};

export default GroupCreatePage;
