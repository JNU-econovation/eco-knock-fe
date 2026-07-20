import CoinLogItem from './CoinLogItem';
import './CoinLogList.css';

const CoinLogList = ({ coinLogs = [], variant = 'card' }) => (
  coinLogs.length > 0 ? (
    <ul className={`coin-log-list coin-log-list--${variant}`}>
      {coinLogs.map((coinLog) => (
        <CoinLogItem key={coinLog.id} {...coinLog} variant={variant} />
      ))}
    </ul>
  ) : (
    <p className={`coin-log-list__empty coin-log-list__empty--${variant}`}>
      코인 내역이 없습니다.
    </p>
  )
);

export default CoinLogList;
