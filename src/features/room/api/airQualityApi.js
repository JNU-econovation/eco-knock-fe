import { apiClient } from '@/shared/api/apiClient';

const PUBLIC_AIR_QUALITY_REQUEST = { skipAuthRefresh: true };

export const getAirQualityTimeseries = ({ resolution, from, to, signal }) => (
  apiClient.get('/air-quality/timeseries', {
    ...PUBLIC_AIR_QUALITY_REQUEST,
    params: { resolution, from, to },
    signal,
  })
);

export const getAirQualityHistory = ({ resolution, before, limit, signal }) => (
  apiClient.get('/air-quality/timeseries/history', {
    ...PUBLIC_AIR_QUALITY_REQUEST,
    params: { resolution, before, limit },
    signal,
  })
);
