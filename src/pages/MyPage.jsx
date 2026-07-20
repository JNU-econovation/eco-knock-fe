import { SettingsIcon } from '@/assets/icons/MyPageIcons';
import CoinRecordCard from '@/features/coin/components/CoinRecordCard';
import { MOCK_COIN_DETAIL } from '@/features/coin/constants/mockCoinDetail';
import AccountActions from '@/features/mypage/components/AccountActions';
import UserProfileCard from '@/features/mypage/components/UserProfileCard';
import { MOCK_USER } from '@/features/mypage/constants/mockUser';
import MainPageFrame from '@/shared/components/layout/MainPageFrame';
import { ROUTES } from '@/shared/constants/routes';
import './MyPage.css';

const MyPage = ({ userData, coinRecords = MOCK_COIN_DETAIL.coinRecords }) => {
  const user = userData ?? MOCK_USER;

  const handleLogout = () => {
    // TODO: 로그아웃 API와 인증 상태 초기화 방식이 확정되면 연결합니다.
  };

  const handleWithdraw = () => {
    // TODO: 회원 탈퇴 API 계약이 확정되면 연결합니다.
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
          <UserProfileCard user={user} />
        </section>

        <section className="my-page__section" aria-labelledby="my-coin-title">
          <h2 className="my-page__section-title" id="my-coin-title">
            coin
          </h2>
          <CoinRecordCard
            coinBalance={user.coinBalance}
            coinRecords={coinRecords ?? []}
            limit={3}
            to={ROUTES.MYPAGE_COIN}
          />
        </section>

        <AccountActions
          onLogout={handleLogout}
          onWithdraw={handleWithdraw}
        />
      </div>
    </MainPageFrame>
  );
};

export default MyPage;
