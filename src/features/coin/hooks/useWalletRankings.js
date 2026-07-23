import { useEffect, useState } from 'react';
import { getWalletRankings } from '../api/walletApi';
import { mapWalletRankings } from '../utils/coinApiData';

export const useWalletRankings = (limit) => {
  const [rankingData, setRankingData] = useState({
    rankings: [],
    symbol: 'KRT',
    calculatedAt: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const loadRankings = async () => {
      setIsLoading(true);

      try {
        const response = await getWalletRankings({
          limit,
          signal: controller.signal,
        });
        const result = response.data.result;

        if (!isActive) return;

        setRankingData({
          rankings: mapWalletRankings(result?.rankings),
          symbol: result?.symbol || 'KRT',
          calculatedAt: result?.calculatedAt ?? null,
        });
      } catch {
        // The shared API client handles request errors.
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    loadRankings();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [limit]);

  return { ...rankingData, isLoading };
};
