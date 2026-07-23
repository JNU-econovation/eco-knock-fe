import { useEffect, useState } from 'react';
import { getMyWalletBalance } from '../api/walletApi';

export const useWalletBalance = ({ enabled = true } = {}) => {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    if (!enabled) return undefined;

    const controller = new AbortController();
    let isActive = true;

    const loadWallet = async () => {
      try {
        const response = await getMyWalletBalance(controller.signal);

        if (isActive) setWallet(response.data.result ?? null);
      } catch {
        // The shared API client handles request errors.
      }
    };

    loadWallet();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [enabled]);

  return enabled ? wallet : null;
};
