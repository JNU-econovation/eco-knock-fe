import {
  BadFaceIcon,
  GoodFaceIcon,
  NormalFaceIcon,
  VeryBadFaceIcon,
  VeryGoodFaceIcon,
} from '@/assets/icons/RoomIcons';
import { getAirQualityLevel } from '../utils/airQualityLevel';

export const AIR_QUALITY_LEVELS = {
  veryGood: { label: '매우 좋음', shortLabel: '매우좋음', Icon: VeryGoodFaceIcon },
  good: { label: '좋음', shortLabel: '좋음', Icon: GoodFaceIcon },
  normal: { label: '보통', shortLabel: '보통', Icon: NormalFaceIcon },
  bad: { label: '나쁨', shortLabel: '나쁨', Icon: BadFaceIcon },
  veryBad: { label: '매우 나쁨', shortLabel: '매우나쁨', Icon: VeryBadFaceIcon },
};

const TIMES = [
  '16:00', '16:15', '16:30', '16:45',
  '17:00', '17:15', '17:30', '17:45',
  '18:00', '18:15', '18:30', '18:45',
];

const makeReadings = (values) => TIMES.map((time, index) => ({
  id: `${time}-${index}`,
  time,
  value: values[index],
}));

const makeAirQualityReadings = (sensorValues) => TIMES.map((time, index) => ({
  id: `${time}-${index}`,
  time,
  sensorValues: sensorValues[index],
  value: getAirQualityLevel(sensorValues[index]),
}));

const AIR_QUALITY_SENSOR_VALUES = [
  { temperature: 25, humidity: 38, co2: 820, bvoc: 210 },
  { temperature: 25, humidity: 40, co2: 680, bvoc: 90 },
  { temperature: 24, humidity: 36, co2: 1120, bvoc: 420 },
  { temperature: 25, humidity: 37, co2: 1620, bvoc: 820 },
  { temperature: 26, humidity: 42, co2: 730, bvoc: 180 },
  { temperature: 27, humidity: 34, co2: 980, bvoc: 280 },
  { temperature: 26, humidity: 39, co2: 1280, bvoc: 540 },
  { temperature: 25, humidity: 45, co2: 640, bvoc: 80 },
  { temperature: 24, humidity: 32, co2: 1480, bvoc: 920 },
  { temperature: 28, humidity: 29, co2: 1880, bvoc: 1600 },
  { temperature: 29, humidity: 24, co2: 2150, bvoc: 3400 },
  { temperature: 25, humidity: 41, co2: 760, bvoc: 220 },
];

// TODO: 동방 환경 조회 API 계약이 확정되면 서버 응답으로 교체합니다.
export const MOCK_ROOM_ENVIRONMENT = [
  {
    id: 'temperature',
    title: '동방 온도',
    type: 'value',
    currentValue: '25°C',
    readings: makeReadings([
      '27°C', '25°C', '24°C', '25°C', '26°C', '25°C',
      '25°C', '24°C', '24°C', '25°C', '25°C', '25°C',
    ]),
  },
  {
    id: 'humidity',
    title: '동방 습도',
    type: 'value',
    currentValue: '38%',
    readings: makeReadings([
      '38%', '37%', '36%', '37%', '39%', '38%',
      '38%', '37%', '36%', '37%', '38%', '38%',
    ]),
  },
  {
    id: 'fine-dust',
    title: '동방 미세먼지',
    type: 'status',
    currentLevel: 'bad',
    readings: makeReadings([
      'veryGood', 'normal', 'veryBad', 'good', 'normal', 'bad',
      'good', 'veryGood', 'normal', 'bad', 'veryBad', 'bad',
    ]),
  },
  {
    id: 'air-quality',
    title: '동방 공기질',
    type: 'status',
    currentLevel: getAirQualityLevel(AIR_QUALITY_SENSOR_VALUES[0]),
    readings: makeAirQualityReadings(AIR_QUALITY_SENSOR_VALUES),
  },
];
