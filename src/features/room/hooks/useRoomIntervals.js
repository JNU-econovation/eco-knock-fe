import { useContext } from 'react';
import { RoomIntervalContext } from '../contexts/RoomIntervalContext';

export const useRoomIntervals = () => {
  const context = useContext(RoomIntervalContext);

  if (!context) {
    throw new Error('useRoomIntervals must be used within a RoomIntervalProvider');
  }

  return context;
};
