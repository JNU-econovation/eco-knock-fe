import { formatCoinAmount } from '../utils/formatCoinAmount';
import './CoinSummary.css';

const CoinSummary = ({ coinBalance }) => (
  <section className="coin-summary" aria-labelledby="coin-summary-title">
    <h2 className="coin-summary__title" id="coin-summary-title">
      MY COIN
    </h2>
    <p className="coin-summary__balance">
      {formatCoinAmount(coinBalance)} COIN
    </p>
  </section>
);

export default CoinSummary;
