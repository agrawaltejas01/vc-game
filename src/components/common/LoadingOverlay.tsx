import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../game/LoadingSpinner';
import { getNextLoadingMessage } from '../../utils/loadingMessages';

interface LoadingOverlayProps {
  show: boolean;
}

export function LoadingOverlay({ show }: LoadingOverlayProps) {
  const [message, setMessage] = useState(getNextLoadingMessage());

  useEffect(() => {
    if (!show) return;

    // Rotate message every 2 seconds
    const interval = setInterval(() => {
      setMessage(getNextLoadingMessage());
    }, 2000);

    return () => clearInterval(interval);
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex items-center justify-center transition-opacity duration-300">
      <LoadingSpinner size="lg" text={message} />
    </div>
  );
}
