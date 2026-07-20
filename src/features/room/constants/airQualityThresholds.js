// 임시 기준입니다. 
// TODO: 공기질 산정 기준이 확정되면 이 값만 교체합니다.
export const AIR_QUALITY_THRESHOLDS = {
  co2: [
    { level: 'veryGood', max: 700 },
    { level: 'good', max: 1000 },
    { level: 'normal', max: 1500 },
    { level: 'bad', max: 2000 },
  ],
  bvoc: [
    { level: 'veryGood', max: 100 },
    { level: 'good', max: 300 },
    { level: 'normal', max: 1000 },
    { level: 'bad', max: 3000 },
  ],
};
