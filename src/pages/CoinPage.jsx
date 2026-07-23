import CoinLogPreview from '@/features/coin/components/CoinLogPreview';
import CoinRecordSection from '@/features/coin/components/CoinRecordSection';
import CoinSummary from '@/features/coin/components/CoinSummary';
import { useRewardHistory } from '@/features/coin/hooks/useRewardHistory';
import { useWalletBalance } from '@/features/coin/hooks/useWalletBalance';
import { useWalletRankings } from '@/features/coin/hooks/useWalletRankings';
import DetailPageFrame from '@/shared/components/layout/DetailPageFrame';
import { ROUTES } from '@/shared/constants/routes';

const CoinPage = () => {
  const wallet = useWalletBalance();
  const rankingData = useWalletRankings(10);
  const rewardHistory = useRewardHistory(4);
  const symbol = wallet?.symbol || rankingData.symbol;

  return (
    <DetailPageFrame title="COIN" variant="plain">
      <CoinSummary balance={wallet?.balance} symbol={symbol} />
      <CoinLogPreview
        coinLogs={rewardHistory.coinLogs}
        isLoading={rewardHistory.isLoading}
        symbol={symbol}
        to={ROUTES.MYPAGE_COIN_LOG}
      />
      <CoinRecordSection
        balance={wallet?.balance}
        symbol={symbol}
        coinRecords={rankingData.rankings}
        isRecordsLoading={rankingData.isLoading}
      />
    </DetailPageFrame>
  );
};

export default CoinPage;
