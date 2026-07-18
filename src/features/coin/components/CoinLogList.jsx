import CoinLogItem from './CoinLogItem';
import './CoinLogList.css';

const CoinLogList = ({ coinLogs = [] }) => (
  <section className="coin-log" aria-labelledby="coin-log-title">
    <h2 className="coin-log__title" id="coin-log-title">
      COIN LOG
    </h2>

    {coinLogs.length > 0 ? (
      <ul className="coin-log__list">
        {coinLogs.map((coinLog) => (
          <CoinLogItem key={coinLog.id} {...coinLog} />
        ))}
      </ul>
    ) : (
      <p className="coin-log__empty">코인 내역이 없습니다.</p>
    )}
  </section>
);

export default CoinLogList;
