import CoinRecordCard from './CoinRecordCard';
import './CoinRecordSection.css';

const CoinRecordSection = ({ coinBalance, coinRecords = [] }) => (
  <section className="coin-record-section" aria-labelledby="coin-record-title">
    <h2 className="coin-record-section__title" id="coin-record-title">
      COIN RECORD
    </h2>
    <CoinRecordCard
      coinBalance={coinBalance}
      coinRecords={coinRecords}
    />
  </section>
);

export default CoinRecordSection;
