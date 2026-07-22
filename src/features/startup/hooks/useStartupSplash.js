import { useEffect, useState } from 'react';

const MINIMUM_VISIBLE_TIME = 1500;
const EXIT_TRANSITION_TIME = 1000;

export default function useStartupSplash() {
  const [phase, setPhase] = useState('visible');

  useEffect(() => {
    let isActive = true;
    let exitTimer;
    let minimumTimer;
    let handleWindowLoad;

    const minimumTimeElapsed = new Promise((resolve) => {
      minimumTimer = window.setTimeout(resolve, MINIMUM_VISIBLE_TIME);
    });

    const initialLoadCompleted =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise((resolve) => {
            handleWindowLoad = resolve;
            window.addEventListener('load', handleWindowLoad, { once: true });
          });

    Promise.all([minimumTimeElapsed, initialLoadCompleted]).then(() => {
      if (!isActive) return;

      setPhase('exiting');
      exitTimer = window.setTimeout(() => {
        if (isActive) setPhase('hidden');
      }, EXIT_TRANSITION_TIME);
    });

    return () => {
      isActive = false;
      window.clearTimeout(minimumTimer);
      window.clearTimeout(exitTimer);

      if (handleWindowLoad) {
        window.removeEventListener('load', handleWindowLoad);
      }
    };
  }, []);

  return {
    isExiting: phase === 'exiting',
    isVisible: phase !== 'hidden',
  };
}
