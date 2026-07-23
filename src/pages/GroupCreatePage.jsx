import { useNavigate } from 'react-router-dom';
import GroupCreateForm from '@/features/groups/components/GroupCreateForm';
import DetailPageFrame from '@/shared/components/layout/DetailPageFrame';
import { ROUTES } from '@/shared/constants/routes';
import './GroupCreatePage.css';

const GroupCreatePage = () => {
  const navigate = useNavigate();

  return (
    <DetailPageFrame
      title="그룹 만들기"
      className="group-create-page"
    >
      <GroupCreateForm onSubmit={() => navigate(ROUTES.GROUPS)} />
    </DetailPageFrame>
  );
};

export default GroupCreatePage;
