// 임시 기준입니다. 
// TODO: 공기질 산정 기준이 확정되면 이 값만 교체합니다.
export const AIR_QUALITY_THRESHOLDS = {
  temperature: [
    { level: 'veryGood', min: 20, max: 26 },
    { level: 'good', min: 18, max: 28 },
    { level: 'normal', min: 16, max: 30 },
    { level: 'bad', min: 14, max: 32 },
  ],
  humidity: [
    { level: 'veryGood', min: 40, max: 60 },
    { level: 'good', min: 30, max: 70 },
    { level: 'normal', min: 20, max: 80 },
    { level: 'bad', min: 15, max: 85 },
  ],
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
