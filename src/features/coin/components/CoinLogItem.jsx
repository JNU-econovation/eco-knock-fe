import './CoinLogItem.css';

const EMPTY_VALUE = '-';

const formatCoinAmount = (amount) => {
  if (amount === null || amount === undefined) {
    return EMPTY_VALUE;
  }

  return new Intl.NumberFormat('ko-KR').format(amount);
};

const CoinLogItem = ({ description, occurredAtLabel, amount }) => (
  <li className="coin-log-item">
    <span className="coin-log-item__content">
      <strong className="coin-log-item__description">
        {description || EMPTY_VALUE}
      </strong>
      <time className="coin-log-item__date">
        {occurredAtLabel || EMPTY_VALUE}
      </time>
    </span>
    <strong className="coin-log-item__amount">
      {formatCoinAmount(amount)} COIN
    </strong>
  </li>
);

export default CoinLogItem;
