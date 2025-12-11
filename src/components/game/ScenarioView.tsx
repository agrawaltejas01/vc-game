import { useState } from 'react';
import { Scenario } from '../../types/scenario';
import { ScenarioDetails } from './ScenarioDetails';
import { ResponseInput } from './ResponseInput';
import { isFeatureEnabled } from '../../config/engagementFeatures';

interface ScenarioViewProps {
  scenario: Scenario;
  onSubmit: (decision: 'not_investing' | 'investing', textResponse?: string, audioBlob?: Blob) => void;
  isSubmitting: boolean;
  error: string | null;
}

export function ScenarioView({ scenario, onSubmit, isSubmitting, error }: ScenarioViewProps) {
  const [decision, setDecision] = useState<'not_investing' | 'investing' | null>(null);
  const [textResponse, setTextResponse] = useState('');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [skipRationale, setSkipRationale] = useState(false);
  const [textActive, setTextActive] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const skipEnabled = isFeatureEnabled('allowSkipRationale');
  const canSubmit = decision !== null &&
    (skipEnabled
      ? (skipRationale || textResponse.trim().length > 0 || audioBlob !== null)
      : (textResponse.trim().length > 0 || audioBlob !== null)
    ) && !isSubmitting;

  // Toggle text input
  const handleTextToggle = () => {
    if (textActive) {
      // Turning off text - clear the value
      setTextResponse('');
      setTextActive(false);
    } else {
      // Turning on text - uncheck skip if checked
      setTextActive(true);
      if (skipRationale) {
        setSkipRationale(false);
      }
    }
  };

  // Toggle audio input
  const handleAudioToggle = () => {
    if (audioActive) {
      // Turning off audio - clear the blob
      setAudioBlob(null);
      setAudioActive(false);
    } else {
      // Turning on audio - uncheck skip if checked
      setAudioActive(true);
      if (skipRationale) {
        setSkipRationale(false);
      }
    }
  };

  // Handle skip checkbox
  const handleSkipChange = (checked: boolean) => {
    if (checked) {
      // Checking skip - clear and deactivate text/audio
      if (textActive) {
        setTextResponse('');
        setTextActive(false);
      }
      if (audioActive) {
        setAudioBlob(null);
        setAudioActive(false);
      }
    }
    setSkipRationale(checked);
  };

  const handleSubmit = () => {
    if (!canSubmit || !decision) return;

    // Feature 3: Success animation
    if (isFeatureEnabled('showSuccessAnimation')) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onSubmit(decision, textResponse.trim() || undefined, audioBlob || undefined);

        // Reset form
        setDecision(null);
        setTextResponse('');
        setAudioBlob(null);
        setSkipRationale(false);
        setTextActive(false);
        setAudioActive(false);
      }, 1500);
    } else {
      onSubmit(decision, textResponse.trim() || undefined, audioBlob || undefined);

      // Reset form
      setDecision(null);
      setTextResponse('');
      setAudioBlob(null);
      setSkipRationale(false);
      setTextActive(false);
      setAudioActive(false);
    }
  };

  return (
    <div className="py-8 px-6 space-y-8">
      <ScenarioDetails scenario={scenario} />

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-black mb-4">Your Decision</h3>

        {error && (
          <div className="mb-4 p-4 bg-semantic-errorLight border-2 border-semantic-error rounded-lg">
            <p className="text-semantic-error text-sm font-semibold">{error}</p>
          </div>
        )}

        {/* Pass/Invest Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            onClick={() => setDecision('not_investing')}
            disabled={isSubmitting}
            className={`
              py-6 px-4 rounded-lg border-3 font-bold text-lg transition-all
              ${
                decision === 'not_investing'
                  ? 'bg-semantic-errorLight border-semantic-error text-semantic-error shadow-lg'
                  : 'bg-white border-gray-300 text-black hover:border-semantic-error hover:bg-semantic-errorLight'
              }
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="text-3xl mb-2">👎</div>
            <div>Pass</div>
          </button>

          <button
            type="button"
            onClick={() => setDecision('investing')}
            disabled={isSubmitting}
            className={`
              py-6 px-4 rounded-lg border-3 font-bold text-lg transition-all
              ${
                decision === 'investing'
                  ? 'bg-semantic-successLight border-semantic-success text-semantic-success shadow-lg'
                  : 'bg-white border-gray-300 text-black hover:border-semantic-success hover:bg-semantic-successLight'
              }
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="text-3xl mb-2">👍</div>
            <div>Invest</div>
          </button>
        </div>

        {/* Text or Audio Response */}
        {decision && (
          <div className="mb-6">
            <ResponseInput
              textValue={textResponse}
              onTextChange={setTextResponse}
              audioBlob={audioBlob}
              onAudioChange={setAudioBlob}
              textActive={textActive}
              audioActive={audioActive}
              onTextToggle={handleTextToggle}
              onAudioToggle={handleAudioToggle}
              disabled={isSubmitting}
            />
          </div>
        )}

        {/* Skip Checkbox - Only show after decision is made and if feature is enabled */}
        {decision && skipEnabled && (
          <div className="mt-6 flex items-center space-x-2">
            <input
              type="checkbox"
              id="skip-rationale"
              checked={skipRationale}
              onChange={(e) => handleSkipChange(e.target.checked)}
              disabled={isSubmitting}
              className="w-4 h-4 border-2 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
            />
            <label
              htmlFor="skip-rationale"
              className="text-sm text-gray-600 cursor-pointer select-none"
            >
              Skip - I don't want to add a rationale
            </label>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`
              ${canSubmit ? 'btn-primary px-8' : 'btn-disabled px-8'}
              ${showSuccess ? 'bg-semantic-success' : ''}
              transition-all duration-300
            `}
          >
            {showSuccess ? (
              <svg className="w-6 h-6 animate-checkmark inline-block" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              isSubmitting ? 'Submitting...' : 'Submit Decision'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
