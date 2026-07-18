import CoinLogList from '@/features/coin/components/CoinLogList';
import CoinSummary from '@/features/coin/components/CoinSummary';
import { MOCK_COIN_DETAIL } from '@/features/coin/constants/mockCoinDetail';
import './CoinPage.css';

const CoinPage = () => (
  <div className="coin-page">
    <h1 className="coin-page__header">COIN</h1>

    <div className="coin-page__content">
      <CoinSummary coinBalance={MOCK_COIN_DETAIL.coinBalance} />
      <CoinLogList coinLogs={MOCK_COIN_DETAIL.coinLogs} />
    </div>
  </div>
);

export default CoinPage;
