const REWARD_DESCRIPTIONS = {
  ATTENDANCE: '출석 보상을 받았어요!',
  STAY_DURATION: '체류 보상을 받았어요!',
};

const formatSettlementDate = (settlementDate) => {
  if (typeof settlementDate !== 'string') return '';

  const [year, month, day] = settlementDate.split('-');

  return year && month && day ? `${year}.${month}.${day}.` : settlementDate;
};

export const mapWalletRankings = (rankings = []) => rankings.map((ranking) => ({
  id: ranking.memberId,
  rank: ranking.rank,
  userName: ranking.memberName,
  amount: ranking.balance,
}));

export const mapRewardHistory = (history = [], pageNumber = 0) => (
  history.map((reward, index) => {
    const stayHoursLabel = (
      reward.rewardType === 'STAY_DURATION' &&
      Number.isInteger(reward.stayHours)
    )
      ? `${reward.stayHours}시간 `
      : '';
    const description = reward.rewardType === 'STAY_DURATION'
      ? `${stayHoursLabel}${REWARD_DESCRIPTIONS.STAY_DURATION}`
      : REWARD_DESCRIPTIONS[reward.rewardType] ?? 'KRT 보상을 받았어요!';

    return {
      id: `${pageNumber}-${index}-${reward.settlementDate}-${reward.rewardType}`,
      description,
      occurredAtLabel: formatSettlementDate(reward.settlementDate),
      amount: reward.rewardAmount,
    };
  })
);
