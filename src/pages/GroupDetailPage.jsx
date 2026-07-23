import { generatePath } from 'react-router-dom';
import GroupDetailContent, {
  GroupSettingsButton,
} from '@/features/groups/components/GroupDetailContent';
import { useGroupRouteContext } from '@/features/groups/hooks/useGroupRouteContext';
import DetailPageFrame from '@/shared/components/layout/DetailPageFrame';
import { ROUTES } from '@/shared/constants/routes';
import './GroupDetailPage.css';

const GroupDetailPage = () => {
  const {
    group,
    permissions,
    roleQuery,
    hasApiData,
    isLoading,
  } = useGroupRouteContext();

  if (isLoading) {
    return <DetailPageFrame title="그룹을 불러오는 중입니다." />;
  }

  if (!group) {
    return <DetailPageFrame title="그룹을 찾을 수 없습니다." />;
  }

  const title = (
    <span className="group-detail-page__title">
      <span>{group.name}</span>
      <small>{group.category}</small>
    </span>
  );

  return (
    <DetailPageFrame
      title={title}
      headerAction={
        permissions?.canViewSettings ? (
          <GroupSettingsButton
            to={
              generatePath(ROUTES.GROUP_SETTINGS, { groupId: group.id }) +
              roleQuery
            }
          />
        ) : null
      }
      className="group-detail-page"
    >
      <GroupDetailContent
        key={group.id}
        group={group}
        permissions={permissions}
        enableApi={hasApiData}
        applicationPath={
          generatePath(ROUTES.GROUP_APPLICATION, { groupId: group.id }) +
          roleQuery
        }
      />
    </DetailPageFrame>
  );
};

export default GroupDetailPage;
