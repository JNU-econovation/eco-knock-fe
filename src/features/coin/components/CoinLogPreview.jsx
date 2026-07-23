import { Link } from 'react-router-dom';
import CoinLogList from './CoinLogList';
import './CoinLogPreview.css';

const CoinLogPreview = ({
  coinLogs = [],
  isLoading = false,
  symbol = 'KRT',
  to,
  limit = 4,
}) => {
  const previewLogs = coinLogs.slice(0, limit);

  return (
    <section className="coin-log-preview" aria-labelledby="coin-log-preview-title">
      <h2 className="coin-log-preview__title" id="coin-log-preview-title">
        COIN LOG
      </h2>
      <Link
        className="coin-log-preview__link"
        to={to}
        aria-label="전체 코인 내역 보기"
      >
        <CoinLogList
          coinLogs={previewLogs}
          isLoading={isLoading}
          symbol={symbol}
          variant="preview"
        />
      </Link>
    </section>
  );
};

export default CoinLogPreview;
