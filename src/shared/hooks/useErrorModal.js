import { useContext } from 'react';
import { ErrorModalContext } from '@/shared/contexts/ErrorModalContext';

export const useErrorModal = () => {
  const context = useContext(ErrorModalContext);

  if (!context) {
    throw new Error('useErrorModal must be used within an ErrorModalProvider');
  }

  return context;
};
