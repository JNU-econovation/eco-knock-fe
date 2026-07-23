import CoinRecordCard from './CoinRecordCard';
import './CoinRecordSection.css';

const CoinRecordSection = ({
  balance,
  symbol,
  coinRecords = [],
  isRecordsLoading = false,
}) => (
  <section className="coin-record-section" aria-labelledby="coin-record-title">
    <h2 className="coin-record-section__title" id="coin-record-title">
      COIN RECORD
    </h2>
    <CoinRecordCard
      balance={balance}
      symbol={symbol}
      coinRecords={coinRecords}
      isRecordsLoading={isRecordsLoading}
    />
  </section>
);

export default CoinRecordSection;
