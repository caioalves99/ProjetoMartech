export const calculateCTR = (clicks: number, impressions: number): number => {
  if (impressions === 0) return 0;
  return (clicks / impressions) * 100;
};

export const calculateCPC = (cost: number, clicks: number): number => {
  if (clicks === 0) return 0;
  return cost / clicks;
};

export const calculateCPA = (cost: number, conversions: number): number => {
  if (conversions === 0) return 0;
  return cost / conversions;
};
