import GroupSettingsMenu from '@/features/groups/components/GroupSettingsMenu';
import { useGroupRouteContext } from '@/features/groups/hooks/useGroupRouteContext';
import DetailPageFrame from '@/shared/components/layout/DetailPageFrame';

const GroupSettingsPage = () => {
  const { group, viewerRole, roleQuery } = useGroupRouteContext();

  if (!group || viewerRole === 'guest') {
    return (
      <DetailPageFrame title="그룹 설정" variant="primary-light">
        <p>설정 권한이 없습니다.</p>
      </DetailPageFrame>
    );
  }

  return (
    <DetailPageFrame title="그룹 설정" variant="primary-light">
      <GroupSettingsMenu
        group={group}
        viewerRole={viewerRole}
        roleQuery={roleQuery}
      />
    </DetailPageFrame>
  );
};

export default GroupSettingsPage;
