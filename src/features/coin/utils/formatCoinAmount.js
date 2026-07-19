const EMPTY_VALUE = '-';

export const formatCoinAmount = (amount) => {
  if (amount === null || amount === undefined) {
    return EMPTY_VALUE;
  }

  return new Intl.NumberFormat('ko-KR').format(amount);
};
