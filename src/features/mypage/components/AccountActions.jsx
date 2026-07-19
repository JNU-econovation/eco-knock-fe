import { useState } from 'react';
import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';
import { ACCOUNT_CONFIRMATIONS } from '../constants/accountConfirmations';
import './AccountActions.css';

const AccountActions = ({ onLogout, onWithdraw }) => {
  const [pendingAction, setPendingAction] = useState(null);
  const confirmation = pendingAction
    ? ACCOUNT_CONFIRMATIONS[pendingAction]
    : null;

  const handleConfirm = () => {
    if (pendingAction === 'logout') {
      onLogout();
    }

    if (pendingAction === 'withdraw') {
      onWithdraw();
    }

    setPendingAction(null);
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
        />
      )}
    </>
  );
};

export default AccountActions;
