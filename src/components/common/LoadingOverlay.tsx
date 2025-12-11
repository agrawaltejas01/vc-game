import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../game/LoadingSpinner';
import { getNextLoadingMessage } from '../../utils/loadingMessages';
import { isFeatureEnabled } from '../../config/engagementFeatures';

interface LoadingOverlayProps {
  show: boolean;
  messages?: string[];
  finalMessage?: string;
  minDuration?: number;
}

export function LoadingOverlay({ show, messages }: LoadingOverlayProps) {
  const [message, setMessage] = useState(getNextLoadingMessage());
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (!show) return;

    // Enhanced mode with custom messages
    if (messages && messages.length > 0 && isFeatureEnabled('showEnhancedFinalLoading')) {
      const interval = setInterval(() => {
        setCurrentMessageIndex(prev => {
          const next = (prev + 1) % messages.length;
          return next;
        });
      }, 800);

      return () => clearInterval(interval);
    } else {
      // Default mode - rotate generic messages every 2 seconds
      const interval = setInterval(() => {
        setMessage(getNextLoadingMessage());
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [show, messages]);

  if (!show) return null;

  // Enhanced loading for final submission
  if (messages && messages.length > 0 && isFeatureEnabled('showEnhancedFinalLoading')) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-white text-lg mt-4 animate-fade-in">
            {messages[currentMessageIndex]}
          </p>
        </div>
      </div>
    );
  }

  // Default loading overlay
  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex items-center justify-center transition-opacity duration-300">
      <LoadingSpinner size="lg" text={message} />
    </div>
  );
}
