import CoinLogPreview from '@/features/coin/components/CoinLogPreview';
import CoinRecordSection from '@/features/coin/components/CoinRecordSection';
import CoinSummary from '@/features/coin/components/CoinSummary';
import { useWalletBalance } from '@/features/coin/hooks/useWalletBalance';
import DetailPageFrame from '@/shared/components/layout/DetailPageFrame';
import { ROUTES } from '@/shared/constants/routes';

const CoinPage = () => {
  const wallet = useWalletBalance();

  return (
    <DetailPageFrame title="COIN" variant="plain">
      <CoinSummary balance={wallet?.balance} symbol={wallet?.symbol} />
      <CoinLogPreview
        coinLogs={[]}
        to={ROUTES.MYPAGE_COIN_LOG}
      />
      <CoinRecordSection
        balance={wallet?.balance}
        symbol={wallet?.symbol}
        coinRecords={[]}
      />
    </DetailPageFrame>
  );
};

export default CoinPage;
