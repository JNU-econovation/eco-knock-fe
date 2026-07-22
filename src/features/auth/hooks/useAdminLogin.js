import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAsAdmin } from '@/features/auth/api/authApi';
import { ROUTES } from '@/shared/constants/routes';

export default function useAdminLogin() {
  const navigate = useNavigate();
  const requestPendingRef = useRef(false);
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (requestPendingRef.current) return;

    requestPendingRef.current = true;
    setIsPending(true);

    try {
      await loginAsAdmin(password);
      navigate(ROUTES.HOME, { replace: true });
    } catch {
      setPassword('');
      // 공통 Axios 인터셉터가 오류 메시지를 표시합니다.
    } finally {
      requestPendingRef.current = false;
      setIsPending(false);
    }
  };

  return { handleSubmit, isPending, password, setPassword };
}
