import { useEffect, useMemo, useRef, useState } from 'react';
import { getAirQualityTimeseries } from '../api/airQualityApi';
import {
  ROOM_INTERVALS,
  ROOM_METRICS,
  ROOM_READING_COUNT,
} from '../constants/roomEnvironment';
import {
  mapAirQualityReadings,
  withRoomMetricReadings,
} from '../utils/airQuality';

const POLLING_INTERVAL_MS = 60_000;
const INTERVAL_MINUTES = Object.fromEntries(
  ROOM_INTERVALS.map(({ id, minutes }) => [id, minutes]),
);

export const useRoomOverviewData = (defaultInterval) => {
  const [readingsByMetric, setReadingsByMetric] = useState({});
  const isRequestPendingRef = useRef(false);
  const requestIdRef = useRef(0);
  useEffect(() => {
    const controller = new AbortController();
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    let isActive = true;

    const loadOverview = async () => {
      if (isRequestPendingRef.current) return;

      isRequestPendingRef.current = true;
      const to = new Date();
      const minutes = INTERVAL_MINUTES[defaultInterval] * ROOM_READING_COUNT;
      const from = new Date(to.getTime() - minutes * 60_000);

      try {
        const response = await getAirQualityTimeseries({
          resolution: defaultInterval,
          from: from.toISOString(),
          to: to.toISOString(),
          signal: controller.signal,
        });

        if (!isActive) return;

        const points = response.data.result?.content ?? [];

        setReadingsByMetric((current) => {
          const next = { ...current };

          ROOM_METRICS.forEach((metric) => {
            next[metric.id] = mapAirQualityReadings(
              points.slice(-ROOM_READING_COUNT),
              metric,
              defaultInterval,
            );
          });

          return next;
        });
      } catch {
        // The shared API client handles the error; retain the previous readings.
      } finally {
        if (requestIdRef.current === requestId) {
          isRequestPendingRef.current = false;
        }
      }
    };

    loadOverview();
    const pollingTimer = window.setInterval(loadOverview, POLLING_INTERVAL_MS);

    return () => {
      isActive = false;
      window.clearInterval(pollingTimer);
      controller.abort();

      if (requestIdRef.current === requestId) {
        isRequestPendingRef.current = false;
      }
    };
  }, [defaultInterval]);

  return useMemo(() => ROOM_METRICS.map((metric) => (
    withRoomMetricReadings(metric, readingsByMetric[metric.id])
  )), [readingsByMetric]);
};
