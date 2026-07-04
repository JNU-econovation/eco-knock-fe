import { useCallback, useMemo, useRef, useState } from 'react';
import { ErrorModalContext } from '@/shared/contexts/ErrorModalContext';
import ErrorModal from './ErrorModal';

const DEFAULT_ERROR_MESSAGE = '요청 처리 중 오류가 발생했습니다.';

const ErrorModalProvider = ({ children }) => {
  const [errorQueue, setErrorQueue] = useState([]);
  const nextErrorIdRef = useRef(0);

  const showError = useCallback((message = DEFAULT_ERROR_MESSAGE) => {
    const error = {
      id: nextErrorIdRef.current,
      message: message || DEFAULT_ERROR_MESSAGE,
    };

    nextErrorIdRef.current += 1;
    setErrorQueue((currentQueue) => [...currentQueue, error]);
  }, []);

  const hideError = useCallback(() => {
    setErrorQueue((currentQueue) => currentQueue.slice(1));
  }, []);

  const contextValue = useMemo(() => ({
    showError,
    hideError,
  }), [hideError, showError]);

  const currentError = errorQueue[0];

  return (
    <ErrorModalContext.Provider value={contextValue}>
      {children}
      {currentError && (
        <ErrorModal
          message={currentError.message}
          onDismiss={hideError}
        />
      )}
    </ErrorModalContext.Provider>
  );
};

export default ErrorModalProvider;
