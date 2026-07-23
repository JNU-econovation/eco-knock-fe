import './CoinLogItem.css';
import { formatCoinAmount } from '../utils/formatCoinAmount';

const EMPTY_VALUE = '-';

const CoinLogItem = ({
  description,
  occurredAtLabel,
  amount,
  symbol = 'KRT',
  variant = 'card',
}) => (
  <li className={`coin-log-item coin-log-item--${variant}`}>
    <span className="coin-log-item__content">
      <strong className="coin-log-item__description">
        {description || EMPTY_VALUE}
      </strong>
      <time className="coin-log-item__date">
        {occurredAtLabel || EMPTY_VALUE}
      </time>
    </span>
    <strong className="coin-log-item__amount">
      {formatCoinAmount(amount)} {symbol}
    </strong>
  </li>
);

export default CoinLogItem;
