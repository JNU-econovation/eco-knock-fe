import { useRef, useState } from 'react';
import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';
import DevelopmentNotice from '@/shared/components/development-notice/DevelopmentNotice';
import { ACCOUNT_CONFIRMATIONS } from '../constants/accountConfirmations';
import './AccountActions.css';

const AccountActions = ({ onLogout }) => {
  const [isLogoutConfirmationOpen, setIsLogoutConfirmationOpen] = useState(false);
  const [isWithdrawNoticeOpen, setIsWithdrawNoticeOpen] = useState(false);
  const [isActionPending, setIsActionPending] = useState(false);
  const withdrawButtonRef = useRef(null);

  const handleConfirmLogout = async () => {
    if (isActionPending) return;

    setIsActionPending(true);

    try {
      await onLogout();
    } catch {
      // API 오류는 공통 Axios 인터셉터가 표시합니다.
    } finally {
      setIsActionPending(false);
      setIsLogoutConfirmationOpen(false);
    }
  };

  const handleConfirmWithdrawNotice = () => {
    setIsWithdrawNoticeOpen(false);
    withdrawButtonRef.current?.focus();
  };

  return (
    <>
      <div className="account-actions" role="group" aria-label="계정 관리">
        <button
          className="account-actions__button"
          type="button"
          onClick={() => setIsLogoutConfirmationOpen(true)}
        >
          로그아웃
        </button>
        <div className="account-actions__withdraw-area">
          {isWithdrawNoticeOpen && (
            <div className="account-actions__withdraw-notice">
              <DevelopmentNotice onConfirm={handleConfirmWithdrawNotice} />
            </div>
          )}
          <button
            ref={withdrawButtonRef}
            className="account-actions__button"
            type="button"
            aria-haspopup="dialog"
            aria-expanded={isWithdrawNoticeOpen}
            onClick={() => setIsWithdrawNoticeOpen(true)}
          >
            회원 탈퇴
          </button>
        </div>
      </div>

      {isLogoutConfirmationOpen && (
        <ConfirmModal
          message={ACCOUNT_CONFIRMATIONS.logout.message}
          confirmLabel="예"
          cancelLabel="취소"
          onConfirm={handleConfirmLogout}
          onCancel={() => setIsLogoutConfirmationOpen(false)}
          isPending={isActionPending}
        />
      )}
    </>
  );
};

export default AccountActions;
