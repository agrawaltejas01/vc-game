import { useEffect, useState } from 'react';
import type { Toast as ToastType } from '../../hooks/useToast';

interface ToastProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!toast.duration || toast.duration === 0) return;

    const startTime = Date.now();
    const duration = toast.duration; // Store to avoid TS possibly undefined error
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
    }, 50);

    return () => clearInterval(interval);
  }, [toast.duration]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(toast.id);
    }, 300); // Match animation duration
  };

  const getTypeStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-semantic-successLight border-semantic-success text-semantic-success';
      case 'warning':
        return 'bg-accent-gold-light border-accent-gold text-accent-gold-dark';
      case 'info':
      default:
        return 'bg-primary-50 border-primary-500 text-black';
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'info':
      default:
        return (
          <span className="text-2xl">✨</span>
        );
    }
  };

  return (
    <div
      className={`
        ${getTypeStyles()}
        border-3 rounded-lg shadow-lg p-4 max-w-sm w-full
        ${isExiting ? 'animate-slide-out-right' : 'animate-slide-in-right'}
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-black">
            {toast.message}
          </p>
          {toast.description && (
            <p className="mt-1 text-xs text-gray-700">
              {toast.description}
            </p>
          )}

          {/* Action Button */}
          {toast.action && (
            <button
              onClick={() => {
                toast.action?.onClick();
                handleDismiss();
              }}
              className="mt-2 text-xs font-semibold text-primary-600 hover:text-primary-700 underline"
            >
              {toast.action.label}
            </button>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      {toast.duration && toast.duration > 0 && (
        <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-current transition-all duration-50 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastType[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col space-y-3 pointer-events-none"
      style={{ maxWidth: 'calc(100vw - 2rem)' }}
    >
      <div className="pointer-events-auto">
        {toasts.slice(-2).map((toast) => (
          <div key={toast.id} className="mb-3">
            <Toast toast={toast} onDismiss={onDismiss} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Mobile-optimized version (centered at top)
export function ToastContainerMobile({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 left-0 right-0 z-50 flex flex-col items-center space-y-3 pointer-events-none px-4"
    >
      <div className="pointer-events-auto w-full max-w-sm">
        {toasts.slice(-2).map((toast) => (
          <div key={toast.id} className="mb-3">
            <Toast toast={toast} onDismiss={onDismiss} />
          </div>
        ))}
      </div>
    </div>
  );
}
