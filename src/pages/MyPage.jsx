import { useNavigate } from 'react-router-dom';
import { SettingsIcon } from '@/assets/icons/MyPageIcons';
import { logout } from '@/features/auth/api/authApi';
import CoinRecordCard from '@/features/coin/components/CoinRecordCard';
import { useWalletBalance } from '@/features/coin/hooks/useWalletBalance';
import { useWalletRankings } from '@/features/coin/hooks/useWalletRankings';
import AccountActions from '@/features/mypage/components/AccountActions';
import UserProfileCard from '@/features/mypage/components/UserProfileCard';
import { useProfile } from '@/features/mypage/hooks/useProfile';
import MainPageFrame from '@/shared/components/layout/MainPageFrame';
import { ROUTES } from '@/shared/constants/routes';
import './MyPage.css';

const MyPage = () => {
  const navigate = useNavigate();
  const profile = useProfile();
  const isCoinDataEnabled = Boolean(
    profile?.role && profile.role !== 'GUEST'
  );
  const wallet = useWalletBalance({ enabled: isCoinDataEnabled });
  const rankingData = useWalletRankings(3, {
    enabled: isCoinDataEnabled,
  });

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <MainPageFrame
      title="Mypage"
      headerAction={(
        <button
          className="my-page__settings-button"
          type="button"
          aria-label="설정 기능 준비 중"
          disabled
        >
          <SettingsIcon />
        </button>
      )}
    >
      <div className="my-page__content">
        <section className="my-page__section" aria-labelledby="my-profile-title">
          <h2 className="my-page__section-title" id="my-profile-title">
            my profile
          </h2>
          <UserProfileCard user={profile} />
        </section>

        <section className="my-page__section" aria-labelledby="my-coin-title">
          <h2 className="my-page__section-title" id="my-coin-title">
            coin
          </h2>
          <CoinRecordCard
            balance={wallet?.balance}
            symbol={wallet?.symbol || rankingData.symbol}
            coinRecords={rankingData.rankings}
            isRecordsLoading={rankingData.isLoading}
            limit={3}
            to={ROUTES.MYPAGE_COIN}
          />
        </section>

        <AccountActions onLogout={handleLogout} />
      </div>
    </MainPageFrame>
  );
};

export default MyPage;
