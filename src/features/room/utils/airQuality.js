const QUALITY_LEVEL_MAP = {
  VERY_BAD: 'veryBad',
  BAD: 'bad',
  NORMAL: 'normal',
  GOOD: 'good',
  VERY_GOOD: 'veryGood',
};

export const formatAirQualityTime = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return '--:--';

  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
};

const mapReadingValue = (point, metric) => {
  const value = point?.[metric.responseField];

  if (metric.type === 'status') return QUALITY_LEVEL_MAP[value] ?? null;
  if (typeof value !== 'number' || !Number.isFinite(value)) return '–';

  return `${Math.round(value)}${metric.unit}`;
};

export const mapAirQualityReadings = (points, metric, resolution) => (
  [...(Array.isArray(points) ? points : [])]
    .sort((left, right) => (
      new Date(left?.time).getTime() - new Date(right?.time).getTime()
    ))
    .map((point, index) => ({
      id: `${metric.id}-${resolution}-${point?.time ?? index}`,
      time: formatAirQualityTime(point?.time),
      value: mapReadingValue(point, metric),
    }))
);

export const withRoomMetricReadings = (metric, readings = []) => {
  const latestReading = readings.at(-1);

  return {
    ...metric,
    readings,
    ...(metric.type === 'status'
      ? { currentLevel: latestReading?.value ?? null }
      : { currentValue: latestReading?.value ?? '–' }),
  };
};
