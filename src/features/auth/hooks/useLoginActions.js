import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAsGuest } from '@/features/auth/api/authApi';
import { startSsoLogin } from '@/features/auth/api/ssoApi';
import { ROUTES } from '@/shared/constants/routes';

export default function useLoginActions() {
  const navigate = useNavigate();
  const guestRequestPendingRef = useRef(false);
  const [isGuestLoginPending, setIsGuestLoginPending] = useState(false);

  const handleSsoLogin = () => {
    const redirectUrl = new URL(ROUTES.HOME, window.location.origin).toString();
    startSsoLogin(redirectUrl);
  };

  const handleGuestLogin = async () => {
    if (guestRequestPendingRef.current) return;

    guestRequestPendingRef.current = true;
    setIsGuestLoginPending(true);

    try {
      await loginAsGuest();
      navigate(ROUTES.HOME, { replace: true });
    } catch {
      // 공통 Axios 인터셉터가 오류 메시지를 표시합니다.
    } finally {
      guestRequestPendingRef.current = false;
      setIsGuestLoginPending(false);
    }
  };

  return {
    handleAdminLogin: () => navigate(ROUTES.LOGIN_ADMIN),
    handleGuestLogin,
    handleSsoLogin,
    isGuestLoginPending,
  };
}
