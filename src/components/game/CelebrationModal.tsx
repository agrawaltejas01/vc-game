import { useEffect } from 'react';

interface CelebrationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  emoji?: string;
  stats?: { label: string; value: string }[];
  progressPercent?: number;
  primaryAction: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  onClose: () => void;
}

export function CelebrationModal({
  isOpen,
  title,
  message,
  emoji = '🎯',
  stats,
  progressPercent,
  primaryAction,
  secondaryAction,
  onClose,
}: CelebrationModalProps) {
  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-bounce"
        role="dialog"
        aria-modal="true"
        aria-labelledby="celebration-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Emoji */}
        <div className="text-center mb-4">
          <div className="text-6xl animate-pulse-subtle">{emoji}</div>
        </div>

        {/* Title */}
        <h2
          id="celebration-title"
          className="text-2xl font-bold text-center text-black mb-3"
        >
          {title}
        </h2>

        {/* Message */}
        <p className="text-center text-gray-700 mb-6">
          {message}
        </p>

        {/* Progress Bar */}
        {progressPercent !== undefined && (
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-sm font-bold text-black min-w-[4rem] text-right">
                {progressPercent}% Complete
              </span>
            </div>
          </div>
        )}

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
            <p className="text-xs font-semibold text-gray-600 uppercase mb-3">
              Quick Stats So Far:
            </p>
            <div className="space-y-2">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center text-sm">
                  <span className="text-primary-500 mr-2">→</span>
                  <span className="text-gray-700">{stat.label}:</span>
                  <span className="ml-2 font-semibold text-black">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="mb-6 text-center text-sm text-gray-600">
          Soon you'll see how your <span className="font-semibold">STATED</span> preferences
          compare to your <span className="font-semibold">REVEALED</span> decision patterns.
        </div>

        {/* Actions */}
        <div className={`flex ${secondaryAction ? 'space-x-3' : ''}`}>
          <button
            onClick={primaryAction.onClick}
            className="btn-primary flex-1"
            autoFocus
          >
            {primaryAction.label}
          </button>

          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="btn-secondary flex-1"
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
