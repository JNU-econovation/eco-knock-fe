import {
  generatePath,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import GroupApplicationFormPanel from '@/features/groups/components/GroupApplicationFormPanel';
import GroupDetailContent from '@/features/groups/components/GroupDetailContent';
import { useGroupRouteContext } from '@/features/groups/hooks/useGroupRouteContext';
import { useProfile } from '@/features/mypage/hooks/useProfile';
import DetailPageFrame from '@/shared/components/layout/DetailPageFrame';
import { ROUTES } from '@/shared/constants/routes';
import './GroupDetailPage.css';

const GroupApplicationPage = () => {
  const navigate = useNavigate();
  const { group, viewerRole } = useGroupRouteContext();
  const profile = useProfile();

  if (!group) {
    return <DetailPageFrame title="그룹을 찾을 수 없습니다." />;
  }

  const detailPath =
    generatePath(ROUTES.GROUP_DETAIL, { groupId: group.id }) +
    `?role=${viewerRole}`;

  if (viewerRole !== 'guest') {
    return <Navigate to={detailPath} replace />;
  }

  const closeApplication = () => navigate(detailPath, { replace: true });
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
        viewerRole="guest"
        showApplyButton={false}
      />
      <GroupApplicationFormPanel
        group={group}
        applicantName={
          typeof profile?.name === 'string' && profile.name.trim()
            ? profile.name.trim()
            : '사용자'
        }
        onClose={closeApplication}
        onSubmitted={closeApplication}
      />
    </DetailPageFrame>
  );
};

export default GroupApplicationPage;
