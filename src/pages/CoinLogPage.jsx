import CoinLogList from '@/features/coin/components/CoinLogList';
import { MOCK_COIN_DETAIL } from '@/features/coin/constants/mockCoinDetail';
import DetailPageFrame from '@/shared/components/layout/DetailPageFrame';

const CoinLogPage = ({ coinDetailData }) => {
  const coinDetail = coinDetailData ?? MOCK_COIN_DETAIL;

  return (
    <DetailPageFrame title="COIN LOG">
      <CoinLogList coinLogs={coinDetail.coinLogs ?? []} variant="history" />
    </DetailPageFrame>
  );
};

export default CoinLogPage;
