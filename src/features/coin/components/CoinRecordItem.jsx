import { useId } from 'react';
import {
  CoinRankFirstIcon,
  CoinRankSecondIcon,
  CoinRankThirdIcon,
} from '@/assets/icons/CoinIcons';
import { formatCoinAmount } from '../utils/formatCoinAmount';
import './CoinRecordItem.css';

const EMPTY_VALUE = '-';
const COIN_RANK_ICONS = {
  1: CoinRankFirstIcon,
  2: CoinRankSecondIcon,
  3: CoinRankThirdIcon,
};

const CoinRankValue = ({ value }) => {
  const filterId = `coin-rank-number-shadow-${useId().replaceAll(':', '')}`;

  return (
    <svg
      className="coin-record-item__rank-value"
      viewBox="0 0 40 40"
      aria-hidden="true"
    >
      <defs>
        <filter
          id={filterId}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          colorInterpolationFilters="sRGB"
        >
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" result="offsetBlur" />
          <feComposite
            in="SourceGraphic"
            in2="offsetBlur"
            operator="out"
            result="inverse"
          />
          <feFlood
            floodColor="#000000"
            floodOpacity="0.25"
            result="shadowColor"
          />
          <feComposite
            in="shadowColor"
            in2="inverse"
            operator="in"
            result="innerShadow"
          />
          <feComposite
            in="innerShadow"
            in2="SourceGraphic"
            operator="over"
          />
        </filter>
      </defs>
      <text
        className="coin-record-item__rank-value-text"
        x="20"
        y="16"
        textAnchor="middle"
        dominantBaseline="middle"
        filter={`url(#${filterId})`}
      >
        {value}
      </text>
    </svg>
  );
};

const CoinRecordItem = ({ rank, userName, amount, symbol = 'KRT' }) => {
  const displayRank = rank ?? EMPTY_VALUE;
  const RankIcon = COIN_RANK_ICONS[rank];
  const rankClassName = RankIcon
    ? ` coin-record-item__rank--icon coin-record-item__rank--${rank}`
    : '';

  return (
    <li className="coin-record-item">
      <span
        className={`coin-record-item__rank${rankClassName}`}
        aria-label={`${displayRank}위`}
      >
        {RankIcon ? (
          <>
            <RankIcon className="coin-record-item__rank-icon" />
            <CoinRankValue value={displayRank} />
          </>
        ) : displayRank}
      </span>
      <strong className="coin-record-item__name">
        {userName || EMPTY_VALUE}
      </strong>
      <strong className="coin-record-item__amount">
        {formatCoinAmount(amount)} {symbol}
      </strong>
    </li>
  );
};

export default CoinRecordItem;
