import { useNavigate } from 'react-router-dom';
import AuthButton from '@/features/auth/components/AuthButton';
import AuthIntro from '@/features/auth/components/AuthIntro';
import MainPageFrame from '@/shared/components/layout/MainPageFrame';
import { ROUTES } from '@/shared/constants/routes';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleMemberLogin = () => {
    // TODO: ECNV 소셜 로그인 API 계약이 확정되면 연결합니다.
  };

  return (
    <MainPageFrame title="ECO-KNOCK" className="auth-page login-page">
      <div className="auth-page__content">
        <AuthIntro />

        <div className="login-page__actions">
          <AuthButton onClick={handleMemberLogin}>ECNV 회원 로그인</AuthButton>
          <AuthButton variant="guest" onClick={() => navigate(ROUTES.HOME)}>
            게스트로 둘러보기
          </AuthButton>
          <AuthButton variant="admin" onClick={() => navigate(ROUTES.LOGIN_ADMIN)}>
            관리자 로그인
          </AuthButton>
        </div>
      </div>
    </MainPageFrame>
  );
}
