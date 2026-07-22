import AuthButton from '@/features/auth/components/AuthButton';
import AuthIntro from '@/features/auth/components/AuthIntro';
import useLoginActions from '@/features/auth/hooks/useLoginActions';
import MainPageFrame from '@/shared/components/layout/MainPageFrame';
import './LoginPage.css';

export default function LoginPage() {
  const {
    handleAdminLogin,
    handleGuestLogin,
    handleSsoLogin,
    isGuestLoginPending,
  } = useLoginActions();

  return (
    <MainPageFrame title="ECO-KNOCK" className="auth-page login-page">
      <div className="auth-page__content">
        <AuthIntro />

        <div className="login-page__actions">
          <AuthButton onClick={handleSsoLogin} disabled={isGuestLoginPending}>
            ECNV 회원 로그인
          </AuthButton>
          <AuthButton
            variant="guest"
            onClick={handleGuestLogin}
            isPending={isGuestLoginPending}
            pendingLabel="게스트 로그인 중"
          >
            게스트로 둘러보기
          </AuthButton>
          <AuthButton
            variant="admin"
            onClick={handleAdminLogin}
            disabled={isGuestLoginPending}
          >
            관리자 로그인
          </AuthButton>
        </div>
      </div>
    </MainPageFrame>
  );
}
