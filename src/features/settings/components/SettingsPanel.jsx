import { useState } from 'react';
import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';
import { SETTINGS_CONFIRMATIONS } from '../constants/settingsConfirmations';
import SettingsMenu from './SettingsMenu';

const SettingsPanel = ({ onLogout, onWithdraw }) => {
  const [pendingAction, setPendingAction] = useState(null);
  const confirmation = pendingAction
    ? SETTINGS_CONFIRMATIONS[pendingAction]
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
      <SettingsMenu
        onRequestLogout={() => setPendingAction('logout')}
        onRequestWithdraw={() => setPendingAction('withdraw')}
      />

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

export default SettingsPanel;
