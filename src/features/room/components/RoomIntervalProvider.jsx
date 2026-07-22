import { useCallback, useMemo, useState } from 'react';
import {
  DEFAULT_ROOM_INTERVAL,
  ROOM_METRICS,
} from '../constants/roomEnvironment';
import { RoomIntervalContext } from '../contexts/RoomIntervalContext';

const INITIAL_INTERVALS = Object.fromEntries(
  ROOM_METRICS.map((metric) => [metric.id, DEFAULT_ROOM_INTERVAL]),
);

const RoomIntervalProvider = ({ children }) => {
  const [defaultIntervals, setDefaultIntervals] = useState(INITIAL_INTERVALS);

  const setDefaultInterval = useCallback((metricId, intervalId) => {
    setDefaultIntervals((currentIntervals) => ({
      ...currentIntervals,
      [metricId]: intervalId,
    }));
  }, []);

  const contextValue = useMemo(() => ({
    defaultIntervals,
    setDefaultInterval,
  }), [defaultIntervals, setDefaultInterval]);

  return (
    <RoomIntervalContext.Provider value={contextValue}>
      {children}
    </RoomIntervalContext.Provider>
  );
};

export default RoomIntervalProvider;
