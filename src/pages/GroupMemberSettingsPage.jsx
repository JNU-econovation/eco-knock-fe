import GroupMemberSettingsList from '@/features/groups/components/GroupMemberSettingsList';
import { useGroupRouteContext } from '@/features/groups/hooks/useGroupRouteContext';
import DetailPageFrame from '@/shared/components/layout/DetailPageFrame';

const GroupMemberSettingsPage = () => {
  const { group, viewerRole } = useGroupRouteContext();

  return (
    <DetailPageFrame title="그룹 멤버" variant="primary-light">
      {group && viewerRole !== 'guest' ? (
        <GroupMemberSettingsList
          group={group}
          canManage={viewerRole === 'leader'}
        />
      ) : (
        <p>그룹 멤버를 조회할 권한이 없습니다.</p>
      )}
    </DetailPageFrame>
  );
};

export default GroupMemberSettingsPage;
