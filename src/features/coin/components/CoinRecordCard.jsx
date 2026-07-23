import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CoinIcon } from '@/assets/icons/MyPageIcons';
import coinImage from '@/assets/img/ecnv-coin-krt.png';
import ButtonSpinner from '@/shared/components/button-spinner/ButtonSpinner';
import { formatCoinAmount } from '../utils/formatCoinAmount';
import CoinRecordItem from './CoinRecordItem';
import './CoinRecordCard.css';

const CoinRecordCardContent = ({
  balance,
  symbol,
  coinRecords,
  isRecordsLoading,
  limit,
}) => {
  const [hasCoinImageError, setHasCoinImageError] = useState(false);
  const visibleRecords = Number.isInteger(limit)
    ? coinRecords.slice(0, limit)
    : coinRecords;

  return (
    <>
      <div className="coin-record-card__summary">
        <span className="coin-record-card__balance-content">
          <span className="coin-record-card__label">MY COIN</span>
          <strong className="coin-record-card__balance">
            {formatCoinAmount(balance)} {symbol}
          </strong>
        </span>
        <span className="coin-record-card__coin-image" aria-hidden="true">
          {!hasCoinImageError ? (
            <img
              src={coinImage}
              alt=""
              onError={() => setHasCoinImageError(true)}
            />
          ) : (
            <CoinIcon />
          )}
        </span>
      </div>

      {isRecordsLoading ? (
        <div
          className="coin-record-card__empty"
          role="status"
          aria-label="코인 순위 불러오는 중"
          aria-busy="true"
        >
          <ButtonSpinner />
        </div>
      ) : visibleRecords.length > 0 ? (
        <ol className="coin-record-card__list">
          {visibleRecords.map((record) => (
            <CoinRecordItem key={record.id} {...record} symbol={symbol} />
          ))}
        </ol>
      ) : (
        <p className="coin-record-card__empty">
          코인 순위 집계 내역이 없습니다.
        </p>
      )}
    </>
  );
};

const CoinRecordCard = ({
  balance,
  symbol = 'KRT',
  coinRecords = [],
  isRecordsLoading = false,
  limit,
  to,
}) => {
  const content = (
    <CoinRecordCardContent
      balance={balance}
      symbol={symbol}
      coinRecords={coinRecords}
      isRecordsLoading={isRecordsLoading}
      limit={limit}
    />
  );

  if (to) {
    return (
      <Link
        className="coin-record-card coin-record-card--link"
        to={to}
        aria-label="코인 잔액과 순위 내역 보기"
      >
        {content}
      </Link>
    );
  }

  return (
    <section className="coin-record-card" aria-label="코인 잔액과 순위 내역">
      {content}
    </section>
  );
};

export default CoinRecordCard;
