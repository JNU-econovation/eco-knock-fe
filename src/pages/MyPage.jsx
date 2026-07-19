import { Link } from 'react-router-dom';
import { SettingsIcon } from '@/assets/icons/MyPageIcons';
import CoinBalanceCard from '@/features/mypage/components/CoinBalanceCard';
import UserProfileCard from '@/features/mypage/components/UserProfileCard';
import { MOCK_USER } from '@/features/mypage/constants/mockUser';
import MainPageFrame from '@/shared/components/layout/MainPageFrame';
import { ROUTES } from '@/shared/constants/routes';
import './MyPage.css';

const MyPage = ({ userData }) => {
  const user = userData ?? MOCK_USER;

  return (
    <MainPageFrame
      title="Mypage"
      headerAction={(
        <Link
          className="my-page__settings-link"
          to={ROUTES.MYPAGE_SETTINGS}
          aria-label="설정 페이지로 이동"
        >
          <SettingsIcon />
        </Link>
      )}
    >
      <div className="my-page__content">
        <UserProfileCard user={user} />
        <CoinBalanceCard coinBalance={user.coinBalance} />
      </div>
    </MainPageFrame>
  );
};

export default MyPage;
