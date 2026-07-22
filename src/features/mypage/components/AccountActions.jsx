import { useState } from 'react';
import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';
import { ACCOUNT_CONFIRMATIONS } from '../constants/accountConfirmations';
import './AccountActions.css';

const AccountActions = ({ onLogout, onWithdraw }) => {
  const [pendingAction, setPendingAction] = useState(null);
  const [isActionPending, setIsActionPending] = useState(false);
  const confirmation = pendingAction
    ? ACCOUNT_CONFIRMATIONS[pendingAction]
    : null;

  const handleConfirm = async () => {
    if (isActionPending) return;

    setIsActionPending(true);

    try {
      if (pendingAction === 'logout') await onLogout();
      if (pendingAction === 'withdraw') await onWithdraw();
    } catch {
      // API 오류는 공통 Axios 인터셉터가 표시합니다.
    } finally {
      setIsActionPending(false);
      setPendingAction(null);
    }
  };

  return (
    <>
      <div className="account-actions" role="group" aria-label="계정 관리">
        <button
          className="account-actions__button"
          type="button"
          onClick={() => setPendingAction('logout')}
        >
          로그아웃
        </button>
        <button
          className="account-actions__button"
          type="button"
          onClick={() => setPendingAction('withdraw')}
        >
          회원 탈퇴
        </button>
      </div>

      {confirmation && (
        <ConfirmModal
          message={confirmation.message}
          confirmLabel="네"
          cancelLabel="취소"
          onConfirm={handleConfirm}
          onCancel={() => setPendingAction(null)}
          isPending={isActionPending}
        />
      )}
    </>
  );
};

export default AccountActions;
