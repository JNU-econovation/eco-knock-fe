import CoinLogList from '@/features/coin/components/CoinLogList';
import CoinSummary from '@/features/coin/components/CoinSummary';
import { MOCK_COIN_DETAIL } from '@/features/coin/constants/mockCoinDetail';
import DetailPageFrame from '@/shared/components/layout/DetailPageFrame';

const CoinPage = ({ coinDetailData }) => {
  const coinDetail = coinDetailData ?? MOCK_COIN_DETAIL;

  return (
    <DetailPageFrame title="COIN" variant="plain">
      <CoinSummary coinBalance={coinDetail.coinBalance} />
      <CoinLogList coinLogs={coinDetail.coinLogs} />
    </DetailPageFrame>
  );
};

export default CoinPage;
