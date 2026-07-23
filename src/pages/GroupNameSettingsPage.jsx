import GroupNameSettingsForm from '@/features/groups/components/GroupNameSettingsForm';
import { useGroupRouteContext } from '@/features/groups/hooks/useGroupRouteContext';
import DetailPageFrame from '@/shared/components/layout/DetailPageFrame';

const GroupNameSettingsPage = () => {
  const navigate = useNavigate();
  const { group, permissions, hasApiData, isLoading } =
    useGroupRouteContext();

  if (isLoading) {
    return (
      <DetailPageFrame title="그룹 이름 수정" variant="primary-light">
        <p>그룹 정보를 불러오는 중입니다.</p>
      </DetailPageFrame>
    );
  }

  return (
    <DetailPageFrame title="그룹 이름 수정" variant="primary-light">
      {group && permissions?.canEditGroup ? (
        <GroupNameSettingsForm
          group={group}
          enableApi={hasApiData}
          onSaved={() => navigate(-1)}
        />
      ) : (
        <p>그룹 이름을 수정할 권한이 없습니다.</p>
      )}
    </DetailPageFrame>
  );
};

export default GroupNameSettingsPage;
import { useNavigate } from 'react-router-dom';
