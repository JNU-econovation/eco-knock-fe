const EMPTY_VALUE = '-';

export const formatCoinAmount = (amount) => {
  if (amount === null || amount === undefined || amount === '') {
    return EMPTY_VALUE;
  }

  const value = String(amount);
  const match = value.match(/^([+-]?)(\d+)(\.\d+)?$/);

  if (!match) return EMPTY_VALUE;

  const [, sign, integer, fraction = ''] = match;
  const groupedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${sign}${groupedInteger}${fraction}`;
};
