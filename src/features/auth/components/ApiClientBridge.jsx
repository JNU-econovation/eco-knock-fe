import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { reissueToken } from '@/features/auth/api/authApi';
import { configureApiClient } from '@/shared/api/apiClient';
import { ROUTES } from '@/shared/constants/routes';
import { useErrorModal } from '@/shared/hooks/useErrorModal';

export default function ApiClientBridge() {
  const navigate = useNavigate();
  const { showError } = useErrorModal();

  useEffect(() => configureApiClient({
    showError,
    reissueToken,
    onUnauthorized: () => navigate(ROUTES.LOGIN, { replace: true }),
    onForbidden: () => navigate(ROUTES.HOME, { replace: true }),
  }), [navigate, showError]);

  return null;
}
