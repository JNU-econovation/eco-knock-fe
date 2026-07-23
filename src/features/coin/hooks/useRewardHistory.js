import { useCallback, useEffect, useRef, useState } from 'react';
import { getMyRewardHistory } from '../api/rewardApi';
import { mapRewardHistory } from '../utils/coinApiData';

export const useRewardHistory = (pageSize) => {
  const [coinLogs, setCoinLogs] = useState([]);
  const [pageMetadata, setPageMetadata] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const controllerRef = useRef(null);
  const isMountedRef = useRef(false);
  const isRequestPendingRef = useRef(false);
  const requestIdRef = useRef(0);

  const loadPage = useCallback(async (pageNumber) => {
    if (isRequestPendingRef.current) return;

    isRequestPendingRef.current = true;
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    const isFirstPage = pageNumber === 0;

    if (isFirstPage) setIsLoading(true);
    else setIsLoadingMore(true);

    try {
      const response = await getMyRewardHistory({
        page: pageNumber,
        size: pageSize,
        signal: controllerRef.current?.signal,
      });
      const result = response.data.result;

      if (!isMountedRef.current) return;

      const nextLogs = mapRewardHistory(result?.content, pageNumber);
      setCoinLogs((currentLogs) => (
        isFirstPage ? nextLogs : [...currentLogs, ...nextLogs]
      ));
      setPageMetadata(result?.page ?? null);
    } catch {
      // The shared API client handles request errors.
    } finally {
      if (requestIdRef.current === requestId) {
        isRequestPendingRef.current = false;

        if (isMountedRef.current) {
          if (isFirstPage) setIsLoading(false);
          else setIsLoadingMore(false);
        }
      }
    }
  }, [pageSize]);

  useEffect(() => {
    const controller = new AbortController();
    controllerRef.current = controller;
    isMountedRef.current = true;
    Promise.resolve().then(() => {
      if (isMountedRef.current && controllerRef.current === controller) {
        loadPage(0);
      }
    });

    return () => {
      isMountedRef.current = false;
      controller.abort();
      isRequestPendingRef.current = false;
      requestIdRef.current += 1;
    };
  }, [loadPage]);

  const hasMore = Boolean(
    pageMetadata &&
    pageMetadata.number + 1 < pageMetadata.totalPages
  );

  const loadMore = useCallback(() => {
    if (!hasMore || isRequestPendingRef.current) return;
    loadPage(pageMetadata.number + 1);
  }, [hasMore, loadPage, pageMetadata]);

  return {
    coinLogs,
    hasMore,
    isLoading,
    isLoadingMore,
    loadMore,
  };
};
