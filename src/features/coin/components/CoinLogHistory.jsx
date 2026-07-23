import ButtonSpinner from '@/shared/components/button-spinner/ButtonSpinner';
import { useRewardHistory } from '../hooks/useRewardHistory';
import CoinLogList from './CoinLogList';
import './CoinLogHistory.css';

const HISTORY_PAGE_SIZE = 20;

const CoinLogHistory = () => {
  const {
    coinLogs,
    hasMore,
    isLoading,
    isLoadingMore,
    loadMore,
  } = useRewardHistory(HISTORY_PAGE_SIZE);

  return (
    <section className="coin-log-history" aria-label="전체 코인 내역">
      <CoinLogList
        coinLogs={coinLogs}
        isLoading={isLoading}
        variant="history"
      />
      {hasMore && (
        <button
          className="coin-log-history__load-more"
          type="button"
          disabled={isLoadingMore}
          aria-busy={isLoadingMore}
          aria-label={isLoadingMore ? '코인 내역 더 불러오는 중' : undefined}
          onClick={loadMore}
        >
          {isLoadingMore ? <ButtonSpinner /> : '더 보기'}
        </button>
      )}
    </section>
  );
};

export default CoinLogHistory;
