import { useState } from 'react';

export const useGroupApplicationForm = () => {
  const [message, setMessage] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return {
    message,
    setMessage,
    isConfirmOpen,
    openConfirm: () => setIsConfirmOpen(true),
    closeConfirm: () => setIsConfirmOpen(false),
  };
};
