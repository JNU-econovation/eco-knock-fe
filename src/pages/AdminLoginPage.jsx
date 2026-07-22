import AuthButton from '@/features/auth/components/AuthButton';
import AuthIntro from '@/features/auth/components/AuthIntro';
import MainPageFrame from '@/shared/components/layout/MainPageFrame';
import './AdminLoginPage.css';
import './LoginPage.css';

export default function AdminLoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: 관리자 로그인 API 계약이 확정되면 연결합니다.
  };

  return (
    <MainPageFrame title="ECO-KNOCK" className="auth-page admin-login-page">
      <div className="auth-page__content">
        <AuthIntro />

        <form className="admin-login-page__form" onSubmit={handleSubmit}>
          <label className="admin-login-page__label" htmlFor="admin-password">
            관리자 로그인
          </label>
          <input
            className="admin-login-page__input"
            id="admin-password"
            name="password"
            type="password"
            placeholder="마스터 비밀번호 입력"
            autoComplete="current-password"
            required
          />
          <AuthButton type="submit">로그인</AuthButton>
        </form>
      </div>
    </MainPageFrame>
  );
}
