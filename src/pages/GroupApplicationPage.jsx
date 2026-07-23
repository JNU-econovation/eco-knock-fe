import {
  generatePath,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { useRef, useState } from 'react';
import { submitGroupApplication } from '@/features/groups/api/groupsApi';
import GroupApplicationFormPanel from '@/features/groups/components/GroupApplicationFormPanel';
import GroupDetailContent from '@/features/groups/components/GroupDetailContent';
import { useGroupRouteContext } from '@/features/groups/hooks/useGroupRouteContext';
import { useProfile } from '@/features/mypage/hooks/useProfile';
import DetailPageFrame from '@/shared/components/layout/DetailPageFrame';
import { ROUTES } from '@/shared/constants/routes';
import './GroupDetailPage.css';

const GroupApplicationPage = () => {
  const navigate = useNavigate();
  const {
    group,
    permissions,
    hasApiData,
    isLoading,
    roleQuery,
  } = useGroupRouteContext();
  const profile = useProfile();
  const [isPending, setIsPending] = useState(false);
  const isPendingRef = useRef(false);

  if (isLoading) {
    return <DetailPageFrame title="그룹을 불러오는 중입니다." />;
  }

  if (!group) {
    return <DetailPageFrame title="그룹을 찾을 수 없습니다." />;
  }

  const detailPath =
    generatePath(ROUTES.GROUP_DETAIL, { groupId: group.id }) +
    roleQuery;

  if (!permissions?.canApply) {
    return <Navigate to={detailPath} replace />;
  }

  const closeApplication = () => navigate(detailPath, { replace: true });
  const submitApplication = async (content) => {
    if (isPendingRef.current) return;

    isPendingRef.current = true;
    setIsPending(true);

    try {
      if (hasApiData) {
        await submitGroupApplication(group.groupId, content.trim());
      }
      closeApplication();
    } catch {
      // The shared API client handles the error.
    } finally {
      isPendingRef.current = false;
      setIsPending(false);
    }
  };
  const title = (
    <span className="group-detail-page__title">
      <span>{group.name}</span>
      <small>{group.category}</small>
    </span>
  );

  return (
    <DetailPageFrame title={title} className="group-detail-page">
      <GroupDetailContent
        group={group}
        permissions={permissions}
        enableApi={hasApiData}
        showApplyButton={false}
      />
      <GroupApplicationFormPanel
        group={group}
        applicantName={
          typeof profile?.name === 'string' && profile.name.trim()
            ? profile.name.trim()
            : '사용자'
        }
        isPending={isPending}
        onClose={closeApplication}
        onSubmitted={submitApplication}
      />
    </DetailPageFrame>
  );
};

export default GroupApplicationPage;
