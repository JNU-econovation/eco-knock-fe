// features/collection/hooks/useCollectionItemPress.js
import { useEffect, useRef, useState } from 'react';

const LONG_PRESS_DELAY = 1500;

export const useCollectionItemPress = ({
  isEditMode,
  onEnterEditMode,
}) => {
  const longPressTimerRef = useRef(null);
  const shouldIgnoreClickRef = useRef(false);
  const [isPressing, setIsPressing] = useState(false);

  const clearLongPressTimer = () => {
    if (!longPressTimerRef.current) return;

    clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = null;
  };

  const startPress = () => {
    if (isEditMode) return;

    clearLongPressTimer();
    setIsPressing(true);
    longPressTimerRef.current = setTimeout(() => {
      shouldIgnoreClickRef.current = true;
      setIsPressing(false);
      onEnterEditMode?.();
    }, LONG_PRESS_DELAY);
  };

  const endPress = () => {
    clearLongPressTimer();
    setIsPressing(false);
  };

  const shouldIgnoreClick = () => {
    if (!shouldIgnoreClickRef.current) return false;

    shouldIgnoreClickRef.current = false;
    return true;
  };

  useEffect(() => clearLongPressTimer, []);

  return {
    isPressing,
    startPress,
    endPress,
    shouldIgnoreClick,
  };
};
