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

export const useRoomOverviewData = (defaultIntervals) => {
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
      const resolutions = [...new Set(ROOM_METRICS.map(
        (metric) => defaultIntervals[metric.id],
      ))];
      const to = new Date();
      const requests = resolutions.map((resolution) => {
        const minutes = INTERVAL_MINUTES[resolution] * ROOM_READING_COUNT;
        const from = new Date(to.getTime() - minutes * 60_000);

        return getAirQualityTimeseries({
          resolution,
          from: from.toISOString(),
          to: to.toISOString(),
          signal: controller.signal,
        });
      });

      try {
        const results = await Promise.allSettled(requests);

        if (!isActive) return;

        const pointsByResolution = Object.fromEntries(
          results.flatMap((result, index) => (
            result.status === 'fulfilled'
              ? [[resolutions[index], result.value.data.result?.content ?? []]]
              : []
          )),
        );

        setReadingsByMetric((current) => {
          const next = { ...current };

          ROOM_METRICS.forEach((metric) => {
            const resolution = defaultIntervals[metric.id];
            const points = pointsByResolution[resolution];

            if (points) {
              next[metric.id] = mapAirQualityReadings(
                points.slice(-ROOM_READING_COUNT),
                metric,
                resolution,
              );
            }
          });

          return next;
        });
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
  }, [defaultIntervals]);

  return useMemo(() => ROOM_METRICS.map((metric) => (
    withRoomMetricReadings(metric, readingsByMetric[metric.id])
  )), [readingsByMetric]);
};
