import './CoinSummary.css';

const formatCoinBalance = (coinBalance) => {
  if (coinBalance === null || coinBalance === undefined) {
    return '-';
  }

  return new Intl.NumberFormat('ko-KR').format(coinBalance);
};

const CoinSummary = ({ coinBalance }) => (
  <section className="coin-summary" aria-labelledby="coin-summary-title">
    <h2 className="coin-summary__title" id="coin-summary-title">
      MY COIN
    </h2>
    <p className="coin-summary__balance">
      {formatCoinBalance(coinBalance)} COIN
    </p>
  </section>
);

export default CoinSummary;
