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
  { id: '1m', label: '1분마다', minutes: 1 },
  { id: '15m', label: '15분마다', minutes: 15 },
  { id: '1h', label: '1시간마다', minutes: 60 },
  { id: '4h', label: '4시간마다', minutes: 240 },
  { id: '1d', label: '1일마다', minutes: 1440 },
];

export const DEFAULT_ROOM_INTERVAL = '15m';
export const ROOM_READING_COUNT = 12;

const SENSOR_ACCURACY_NOTICE = '*추후 더 정확한 값으로 제공될 예정입니다.';

export const ROOM_METRICS = [
  {
    id: 'temperature',
    path: ROUTES.ROOM_TEMPERATURE,
    title: '동방 온도',
    description: '동방의 온도를 나타냅니다.',
    type: 'value',
    responseField: 'temperature',
    unit: '°C',
  },
  {
    id: 'humidity',
    path: ROUTES.ROOM_HUMIDITY,
    title: '동방 습도',
    description: '동방의 습도를 나타냅니다.',
    type: 'value',
    responseField: 'humidity',
    unit: '%',
  },
  {
    id: 'fine-dust',
    path: ROUTES.ROOM_FINE_DUST,
    title: '동방 미세먼지',
    description: '동방의 미세먼지 상태를 나타냅니다.',
    detailNotice: SENSOR_ACCURACY_NOTICE,
    type: 'status',
    responseField: 'pm25Quality',
  },
  {
    id: 'air-quality',
    path: ROUTES.ROOM_AIR_QUALITY,
    title: '동방 공기질',
    description: '동방의 가스 센서 기반 공기질 상태를 나타냅니다.',
    detailNotice: SENSOR_ACCURACY_NOTICE,
    type: 'status',
    responseField: 'gasQuality',
  },
];

export const getRoomMetric = (metricId) => (
  ROOM_METRICS.find((metric) => metric.id === metricId)
);
