import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getAirQualityHistoryDefault,
  updateAirQualityHistoryDefault,
} from '../api/airQualityApi';
import {
  DEFAULT_ROOM_INTERVAL,
  ROOM_INTERVALS,
} from '../constants/roomEnvironment';

const ROOM_INTERVAL_IDS = new Set(ROOM_INTERVALS.map(({ id }) => id));

export const useRoomIntervalSetting = (enabled) => {
  const [defaultInterval, setDefaultIntervalState] = useState(DEFAULT_ROOM_INTERVAL);
  const [pendingDefaultInterval, setPendingDefaultInterval] = useState(null);
  const updateRequestLockRef = useRef(false);
  const settingVersionRef = useRef(0);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const controller = new AbortController();
    const settingVersion = settingVersionRef.current;
    let isActive = true;

    const loadDefaultInterval = async () => {
      try {
        const response = await getAirQualityHistoryDefault(controller.signal);
        const resolution = response.data.result?.resolution;

        if (
          isActive &&
          settingVersionRef.current === settingVersion &&
          ROOM_INTERVAL_IDS.has(resolution)
        ) {
          setDefaultIntervalState(resolution);
        }
      } catch {
        // The shared API client handles the error; retain the local fallback.
      }
    };

    loadDefaultInterval();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [enabled]);

  const setDefaultInterval = useCallback(async (intervalId) => {
    if (
      !ROOM_INTERVAL_IDS.has(intervalId) ||
      updateRequestLockRef.current
    ) return;

    updateRequestLockRef.current = true;
    settingVersionRef.current += 1;
    setPendingDefaultInterval(intervalId);

    try {
      await updateAirQualityHistoryDefault(intervalId);

      if (isMountedRef.current) setDefaultIntervalState(intervalId);
    } catch {
      // The shared API client handles the error; retain the server-confirmed value.
    } finally {
      updateRequestLockRef.current = false;

      if (isMountedRef.current) setPendingDefaultInterval(null);
    }
  }, []);

  return {
    defaultInterval,
    pendingDefaultInterval,
    setDefaultInterval,
  };
};
