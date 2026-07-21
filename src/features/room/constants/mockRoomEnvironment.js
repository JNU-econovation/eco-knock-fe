import {
  BadFaceIcon,
  GoodFaceIcon,
  NormalFaceIcon,
  VeryBadFaceIcon,
  VeryGoodFaceIcon,
} from '@/assets/icons/RoomIcons';
import { ROUTES } from '@/shared/constants/routes';

export const AIR_QUALITY_LEVELS = {
  veryGood: { label: '매우 좋음', shortLabel: '매우좋음', Icon: VeryGoodFaceIcon },
  good: { label: '좋음', shortLabel: '좋음', Icon: GoodFaceIcon },
  normal: { label: '보통', shortLabel: '보통', Icon: NormalFaceIcon },
  bad: { label: '나쁨', shortLabel: '나쁨', Icon: BadFaceIcon },
  veryBad: { label: '매우 나쁨', shortLabel: '매우나쁨', Icon: VeryBadFaceIcon },
};

export const ROOM_INTERVALS = [
  { id: '1m', label: '1분마다', minutes: 1, endMinutes: 18 * 60 + 45 },
  { id: '15m', label: '15분마다', minutes: 15, endMinutes: 18 * 60 + 45 },
  { id: '1h', label: '1시간마다', minutes: 60, endMinutes: 18 * 60 },
  { id: '4h', label: '4시간마다', minutes: 240, endMinutes: 20 * 60 },
];

export const DEFAULT_ROOM_INTERVAL = '15m';

const READING_COUNT = 12;
const TEMPERATURE_OFFSETS = [2, 1, 0, 1, 0, -1, 0, 1, 0, -1, 0, 0];
const HUMIDITY_OFFSETS = [0, -1, -2, -1, 1, 0, 0, -1, -2, -1, 0, 0];
const STATUS_PATTERN = [
  'veryGood', 'good', 'normal', 'bad', 'normal', 'good',
  'veryGood', 'good', 'normal', 'bad', 'veryBad', 'bad',
];
const CO2_VALUES = [620, 740, 860, 1020, 1280, 920, 680, 810, 1180, 1580, 2140, 820];
const BVOC_VALUES = [80, 140, 240, 360, 720, 260, 90, 180, 520, 1400, 3400, 210];

const formatTime = (minutes) => {
  const minutesInDay = 24 * 60;
  const normalizedMinutes = ((minutes % minutesInDay) + minutesInDay) % minutesInDay;
  const hour = Math.floor(normalizedMinutes / 60);
  const minute = normalizedMinutes % 60;

  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
};

const makeTimes = ({ minutes, endMinutes }) => (
  Array.from({ length: READING_COUNT }, (_, index) => (
    formatTime(endMinutes - minutes * (READING_COUNT - 1 - index))
  ))
);

const makeReadings = (interval, values) => (
  makeTimes(interval).map((time, index) => ({
    id: `${interval.id}-${time}-${index}`,
    time,
    value: values[index],
  }))
);

const makeValueHistory = (interval, baseValue, offsets, unit) => (
  makeReadings(interval, offsets.map((offset) => `${baseValue + offset}${unit}`))
);

const makeStatusHistory = (interval) => makeReadings(interval, STATUS_PATTERN);

const makeAirQualityHistory = (interval) => (
  makeTimes(interval).map((time, index) => {
    const sensorValues = {
      co2: CO2_VALUES[index],
      bvoc: BVOC_VALUES[index],
    };

    return {
      id: `${interval.id}-${time}-${index}`,
      time,
      sensorValues,
      value: "good",
    };
  })
);

const makeHistories = (factory) => Object.fromEntries(
  ROOM_INTERVALS.map((interval) => [interval.id, factory(interval)]),
);

// TODO: 동방 환경 조회 API 계약이 확정되면 서버 응답으로 교체합니다.
export const ROOM_METRICS = [
  {
    id: 'temperature',
    path: ROUTES.ROOM_TEMPERATURE,
    title: '동방 온도',
    description: '동방의 온도를 나타냅니다.',
    type: 'value',
    currentValue: '25°C',
    histories: makeHistories((interval) => (
      makeValueHistory(interval, 25, TEMPERATURE_OFFSETS, '°C')
    )),
  },
  {
    id: 'humidity',
    path: ROUTES.ROOM_HUMIDITY,
    title: '동방 습도',
    description: '동방의 습도를 나타냅니다.',
    type: 'value',
    currentValue: '38%',
    histories: makeHistories((interval) => (
      makeValueHistory(interval, 38, HUMIDITY_OFFSETS, '%')
    )),
  },
  {
    id: 'fine-dust',
    path: ROUTES.ROOM_FINE_DUST,
    title: '동방 미세먼지',
    description: '동방의 미세먼지 상태를 나타냅니다.',
    type: 'status',
    currentLevel: 'bad',
    histories: makeHistories(makeStatusHistory),
  },
  {
    id: 'air-quality',
    path: ROUTES.ROOM_AIR_QUALITY,
    title: '동방 공기질',
    description: '동방의 이산화탄소와 bvoc(냄새)를 포함한 공기질 정도를 나타냅니다.',
    type: 'status',
    currentLevel: "good",
    histories: makeHistories(makeAirQualityHistory),
  },
];

export const getRoomMetric = (metricId) => (
  ROOM_METRICS.find((metric) => metric.id === metricId)
);
