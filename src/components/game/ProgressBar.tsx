import { isFeatureEnabled } from '../../config/engagementFeatures';

interface ProgressBarProps {
  current: number;
  total: number;
  showMilestones?: boolean;
  showPercentage?: boolean;
}

export function ProgressBar({
  current,
  total,
  showMilestones = isFeatureEnabled('showEnhancedProgressBar'),
  showPercentage = isFeatureEnabled('showEnhancedProgressBar'),
}: ProgressBarProps) {
  const progress = (current / total) * 100;
  const percentRevealed = Math.round((current / total) * 100);

  // Simple progress bar (original)
  if (!showMilestones) {
    return (
      <div className="w-full bg-gray-200 h-1">
        <div
          className="bg-black h-1 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Scenario ${current} of ${total}`}
        />
      </div>
    );
  }

  // Enhanced progress bar with milestones
  return (
    <div className="w-full">
      {/* Milestone Nodes */}
      <div className="relative flex items-center justify-between mb-3">
        {Array.from({ length: total }, (_, i) => {
          const scenarioNumber = i + 1;
          const isCompleted = scenarioNumber < current;
          const isCurrent = scenarioNumber === current;
          const isUpcoming = scenarioNumber > current;

          return (
            <div key={i} className="flex flex-col items-center flex-1">
              {/* Node Circle */}
              <div className="relative flex items-center justify-center">
                {/* Completed */}
                {isCompleted && (
                  <div className="w-8 h-8 rounded-full bg-black border-2 border-black flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}

                {/* Current - Pulsing */}
                {isCurrent && (
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-primary-500 border-2 border-primary-500 flex items-center justify-center text-white text-xs font-bold animate-pulse-subtle">
                      {scenarioNumber}
                    </div>
                    {/* Pulsing ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-primary-500 animate-pulse-subtle opacity-50" />
                  </div>
                )}

                {/* Upcoming */}
                {isUpcoming && (
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-gray-400 text-xs font-bold">
                    {scenarioNumber}
                  </div>
                )}

                {/* Connector Line */}
                {i < total - 1 && (
                  <div
                    className={`absolute left-1/2 top-1/2 h-0.5 -translate-y-1/2 ${
                      scenarioNumber < current ? 'bg-black' : 'bg-gray-300'
                    }`}
                    style={{
                      width: 'calc(100% + 1rem)',
                      marginLeft: '1rem',
                    }}
                  />
                )}
              </div>

              {/* Scenario Number Label (mobile hidden) */}
              <span className="hidden sm:block mt-2 text-xs text-gray-500 font-medium">
                {scenarioNumber}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress Text */}
      {showPercentage && (
        <div className="text-center">
          <p className="text-sm font-semibold text-black">
            Scenario {current} of {total}
            <span className="text-gray-500 ml-2">•</span>
            <span className="text-primary-600 ml-2">
              Your profile is {percentRevealed}% revealed
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
