import GroupMemberSettingsList from '@/features/groups/components/GroupMemberSettingsList';
import { useGroupRouteContext } from '@/features/groups/hooks/useGroupRouteContext';
import DetailPageFrame from '@/shared/components/layout/DetailPageFrame';
import { ROUTES } from '@/shared/constants/routes';

const GroupMemberSettingsPage = () => {
  const navigate = useNavigate();
  const { group, permissions, hasApiData, isLoading } =
    useGroupRouteContext();

  if (isLoading) {
    return (
      <DetailPageFrame title="그룹 멤버" variant="primary-light">
        <p>그룹 멤버를 불러오는 중입니다.</p>
      </DetailPageFrame>
    );
  }

  return (
    <DetailPageFrame title="그룹 멤버" variant="primary-light">
      {group && permissions?.canViewSettings ? (
        <GroupMemberSettingsList
          key={group.id}
          group={group}
          canManage={permissions.canManageMembers}
          enableApi={hasApiData}
          onLeadershipDelegated={
            group.isLeader
              ? () => navigate(
                generatePath(ROUTES.GROUP_DETAIL, { groupId: group.id }) +
                (hasApiData ? '' : '?role=member'),
                { replace: true },
              )
              : undefined
          }
        />
      ) : (
        <p>그룹 멤버를 조회할 권한이 없습니다.</p>
      )}
    </DetailPageFrame>
  );
};

export default GroupMemberSettingsPage;
import { generatePath, useNavigate } from 'react-router-dom';
