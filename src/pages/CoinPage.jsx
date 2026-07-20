import CoinLogPreview from '@/features/coin/components/CoinLogPreview';
import CoinRecordSection from '@/features/coin/components/CoinRecordSection';
import CoinSummary from '@/features/coin/components/CoinSummary';
import { MOCK_COIN_DETAIL } from '@/features/coin/constants/mockCoinDetail';
import DetailPageFrame from '@/shared/components/layout/DetailPageFrame';
import { ROUTES } from '@/shared/constants/routes';

const CoinPage = ({ coinDetailData }) => {
  const coinDetail = coinDetailData ?? MOCK_COIN_DETAIL;

  return (
    <DetailPageFrame title="COIN" variant="plain">
      <CoinSummary coinBalance={coinDetail.coinBalance} />
      <CoinLogPreview
        coinLogs={coinDetail.coinLogs ?? []}
        to={ROUTES.MYPAGE_COIN_LOG}
      />
      <CoinRecordSection
        coinBalance={coinDetail.coinBalance}
        coinRecords={coinDetail.coinRecords ?? []}
      />
    </DetailPageFrame>
  );
};

export default CoinPage;
