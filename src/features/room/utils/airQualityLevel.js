import { AIR_QUALITY_THRESHOLDS } from '../constants/airQualityThresholds';

const LEVEL_SEVERITY = {
  veryGood: 0,
  good: 1,
  normal: 2,
  bad: 3,
  veryBad: 4,
};

const getSensorLevel = (sensor, value) => {
  const matchedRange = AIR_QUALITY_THRESHOLDS[sensor].find(({ min, max }) => (
    (min === undefined || value >= min) && (max === undefined || value <= max)
  ));

  return matchedRange?.level ?? 'veryBad';
};

export const getAirQualityLevel = (sensorValues) => (
  Object.entries(sensorValues)
    .map(([sensor, value]) => getSensorLevel(sensor, value))
    .reduce((worstLevel, level) => (
      LEVEL_SEVERITY[level] > LEVEL_SEVERITY[worstLevel] ? level : worstLevel
    ), 'veryGood')
);
