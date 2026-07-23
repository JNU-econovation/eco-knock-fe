import CoinLogList from '@/features/coin/components/CoinLogList';
import DetailPageFrame from '@/shared/components/layout/DetailPageFrame';

const CoinLogPage = () => (
  <DetailPageFrame title="COIN LOG">
    <CoinLogList coinLogs={[]} variant="history" />
  </DetailPageFrame>
);

export default CoinLogPage;
