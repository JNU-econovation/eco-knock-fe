import { SettingsIcon } from '@/assets/icons/MyPageIcons';
import CoinBalanceCard from '@/features/mypage/components/CoinBalanceCard';
import UserProfileCard from '@/features/mypage/components/UserProfileCard';
import { MOCK_USER } from '@/features/mypage/constants/mockUser';
import './MyPage.css';

const MyPage = () => (
  <div className="my-page">
    <div className="my-page__heading-row">
      <h1 className="my-page__header">Mypage</h1>
      <button type="button" className="my-page__settings-button">
        <SettingsIcon />
      </button>
    </div>

    <div className="my-page__content">
      <UserProfileCard user={MOCK_USER} />
      <CoinBalanceCard coinBalance={MOCK_USER.coinBalance} />
    </div>
  </div>
);

export default MyPage;
