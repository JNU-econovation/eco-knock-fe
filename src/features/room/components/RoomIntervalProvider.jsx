import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';
import { RoomIntervalContext } from '../contexts/RoomIntervalContext';
import { useRoomIntervalSetting } from '../hooks/useRoomIntervalSetting';

const RoomIntervalProvider = ({ children }) => {
  const { pathname } = useLocation();
  const isRoomRoute = (
    pathname === ROUTES.ROOM ||
    pathname.startsWith(`${ROUTES.ROOM}/`)
  );
  const {
    defaultInterval,
    pendingDefaultInterval,
    setDefaultInterval,
  } = useRoomIntervalSetting(isRoomRoute);

  const contextValue = useMemo(() => ({
    defaultInterval,
    pendingDefaultInterval,
    setDefaultInterval,
  }), [defaultInterval, pendingDefaultInterval, setDefaultInterval]);

  return (
    <RoomIntervalContext.Provider value={contextValue}>
      {children}
    </RoomIntervalContext.Provider>
  );
};

export default RoomIntervalProvider;
