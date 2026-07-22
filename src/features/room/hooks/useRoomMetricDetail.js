import { useEffect, useMemo, useState } from 'react';
import { getAirQualityHistory } from '../api/airQualityApi';
import {
  ROOM_INTERVALS,
  ROOM_READING_COUNT,
} from '../constants/roomEnvironment';
import {
  mapAirQualityReadings,
  withRoomMetricReadings,
} from '../utils/airQuality';

export const useRoomMetricDetail = (metric) => {
  const [histories, setHistories] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const loadHistories = async () => {
      const before = new Date().toISOString();
      const results = await Promise.allSettled(ROOM_INTERVALS.map((interval) => (
        getAirQualityHistory({
          resolution: interval.id,
          before,
          limit: ROOM_READING_COUNT,
          signal: controller.signal,
        })
      )));

      if (!isActive) return;

      setHistories((current) => {
        const next = { ...current };

        results.forEach((result, index) => {
          if (result.status !== 'fulfilled') return;

          const interval = ROOM_INTERVALS[index];
          next[interval.id] = mapAirQualityReadings(
            result.value.data.result?.content,
            metric,
            interval.id,
          );
        });

        return next;
      });
    };

    loadHistories();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [metric]);

  const displayMetric = useMemo(() => (
    withRoomMetricReadings(metric, histories['1m'])
  ), [histories, metric]);

  return { displayMetric, histories };
};
