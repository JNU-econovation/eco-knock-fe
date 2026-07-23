import ButtonSpinner from '@/shared/components/button-spinner/ButtonSpinner';
import CoinLogItem from './CoinLogItem';
import './CoinLogList.css';

const CoinLogList = ({
  coinLogs = [],
  isLoading = false,
  symbol = 'KRT',
  variant = 'card',
}) => (
  isLoading ? (
    <div
      className={`coin-log-list__loading coin-log-list__loading--${variant}`}
      role="status"
      aria-label="코인 내역 불러오는 중"
      aria-busy="true"
    >
      <ButtonSpinner />
    </div>
  ) : coinLogs.length > 0 ? (
    <ul className={`coin-log-list coin-log-list--${variant}`}>
      {coinLogs.map((coinLog) => (
        <CoinLogItem
          key={coinLog.id}
          {...coinLog}
          symbol={symbol}
          variant={variant}
        />
      ))}
    </ul>
  ) : (
    <p className={`coin-log-list__empty coin-log-list__empty--${variant}`}>
      코인 내역이 없습니다.
    </p>
  )
);

export default CoinLogList;
