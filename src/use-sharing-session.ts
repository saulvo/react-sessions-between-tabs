import { useCallback, useEffect, useState } from 'react';

const useSharingSession = () => {
  const [session, setSession] = useState<string>('');

  const refresh = useCallback(() => {
    setSession(Object.keys(window.memoryStorage).length > 0 ? JSON.stringify(window.memoryStorage) : '');
  }, []);

  useEffect(() => {
    window.memoryStorage = {};
    if (Object.keys(window.memoryStorage).length === 0) localStorage.setItem('getSessionStorage', Date.now().toString());

    const sessionTransfer = (e: StorageEvent) => {
      switch (true) {
        case e.key == 'getSessionStorage': {
          localStorage.setItem('sessionStorage', JSON.stringify(window.memoryStorage));
          localStorage.removeItem('sessionStorage');
          break;
        }
        case e.key == 'sessionStorage' && Object.keys(window.memoryStorage).length === 0: {
          const data = JSON.parse(e.newValue || '');
          for (let key in data) {
            window.memoryStorage[key] = data[key];
          }
          refresh();
          break;
        }
        default:
          return;
      }
    };

    window.addEventListener('load', refresh);
    window.addEventListener('storage', sessionTransfer, false);
    return () => {
      window.removeEventListener('load', refresh);
      window.removeEventListener('storage', sessionTransfer);
    };
  }, []);

  return { session, refresh };
};

export { useSharingSession };
