import { useEffect, useRef } from 'react';

export function useWakeLock(isActive) {
  const wakeLockRef = useRef(null);

  useEffect(() => {
    let released = false;

    async function requestWakeLock() {
      if ('wakeLock' in navigator && isActive) {
        try {
          wakeLockRef.current = await navigator.wakeLock.request('screen');
        } catch (err) {
          console.warn('Wake Lock request error:', err);
        }
      }
    }

    if (isActive) {
      requestWakeLock();
    } else if (wakeLockRef.current) {
      wakeLockRef.current.release().then(() => {
        wakeLockRef.current = null;
      }).catch(() => {});
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isActive) {
        requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {});
        wakeLockRef.current = null;
      }
    };
  }, [isActive]);
}
