import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { reissueToken } from '@/features/auth/api/authApi';
import { configureApiClient } from '@/shared/api/apiClient';
import { ROUTES } from '@/shared/constants/routes';
import { useErrorModal } from '@/shared/hooks/useErrorModal';

export default function ApiClientBridge() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showError } = useErrorModal();

  useEffect(() => configureApiClient({
    showError,
    reissueToken,
    onUnauthorized: () => navigate(ROUTES.LOGIN, { replace: true }),
    onForbidden: () => {
      if (location.pathname !== ROUTES.MYPAGE) {
        navigate(ROUTES.HOME, { replace: true });
      }
    },
  }), [location.pathname, navigate, showError]);

  return null;
}
