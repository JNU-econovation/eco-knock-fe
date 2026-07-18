import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CoinIcon } from '@/assets/icons/MyPageIcons';
import coinImage from '@/assets/img/coin.png';
import { ROUTES } from '@/shared/constants/routes';
import './CoinBalanceCard.css';

const formatCoinBalance = (coinBalance) => {
  if (coinBalance === null || coinBalance === undefined) {
    return '-';
  }

  return new Intl.NumberFormat('ko-KR').format(coinBalance);
};

const CoinBalanceCard = ({ coinBalance }) => {
  const displayBalance = formatCoinBalance(coinBalance);
  const [hasCoinImageError, setHasCoinImageError] = useState(false);
  const hasCoinImage = !hasCoinImageError;

  return (
    <Link
      className="coin-balance-card"
      to={ROUTES.COIN}
      aria-label={`보유 코인 ${displayBalance} COIN, 코인 페이지로 이동`}
    >
      <span className="coin-balance-card__content">
        <span className="coin-balance-card__label">MY COIN</span>
        <strong className="coin-balance-card__value">
          {displayBalance} COIN
        </strong>
      </span>
      <span className="coin-balance-card__icon" aria-hidden="true">
        {hasCoinImage ? (
          <img
            className="coin-balance-card__image"
            src={coinImage}
            alt=""
            onError={() => setHasCoinImageError(true)}
          />
        ) : (
          <CoinIcon />
        )}
      </span>
    </Link>
  );
};

export default CoinBalanceCard;
