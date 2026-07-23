import GroupNameSettingsForm from '@/features/groups/components/GroupNameSettingsForm';
import { useGroupRouteContext } from '@/features/groups/hooks/useGroupRouteContext';
import DetailPageFrame from '@/shared/components/layout/DetailPageFrame';

const GroupNameSettingsPage = () => {
  const { group, viewerRole } = useGroupRouteContext();

  return (
    <DetailPageFrame title="그룹 이름 수정" variant="primary-light">
      {group && viewerRole === 'leader' ? (
        <GroupNameSettingsForm group={group} />
      ) : (
        <p>그룹 이름을 수정할 권한이 없습니다.</p>
      )}
    </DetailPageFrame>
  );
};

export default GroupNameSettingsPage;
