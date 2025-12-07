import { useState } from 'react';
import { Scenario } from '../../types/scenario';
import { ScenarioDetails } from './ScenarioDetails';
import { AudioRecorder } from './AudioRecorder';

interface ScenarioViewProps {
  scenario: Scenario;
  onSubmit: (decision: 'pass' | 'invest', audioBlob?: Blob) => void;
  isSubmitting: boolean;
  error: string | null;
}

export function ScenarioView({ scenario, onSubmit, isSubmitting, error }: ScenarioViewProps) {
  const [decision, setDecision] = useState<'pass' | 'invest' | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const canSubmit = decision !== null && !isSubmitting;

  const handleSubmit = () => {
    if (!canSubmit || !decision) return;

    onSubmit(decision, audioBlob || undefined);

    // Reset form
    setDecision(null);
    setAudioBlob(null);
  };

  return (
    <div className="py-8 px-6 space-y-8">
      <ScenarioDetails scenario={scenario} />

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Decision</h3>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Pass/Invest Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            onClick={() => setDecision('pass')}
            disabled={isSubmitting}
            className={`
              py-6 px-4 rounded-lg border-2 font-semibold text-lg transition-all
              ${
                decision === 'pass'
                  ? 'bg-red-100 border-red-500 text-red-700 shadow-md'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-red-400 hover:bg-red-50'
              }
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="text-3xl mb-2">👎</div>
            <div>Pass</div>
          </button>

          <button
            type="button"
            onClick={() => setDecision('invest')}
            disabled={isSubmitting}
            className={`
              py-6 px-4 rounded-lg border-2 font-semibold text-lg transition-all
              ${
                decision === 'invest'
                  ? 'bg-green-100 border-green-500 text-green-700 shadow-md'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-green-400 hover:bg-green-50'
              }
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="text-3xl mb-2">👍</div>
            <div>Invest</div>
          </button>
        </div>

        {/* Audio Recording (Optional) */}
        {decision && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Record your reasoning (optional)
            </label>
            <AudioRecorder
              audioBlob={audioBlob}
              onAudioChange={setAudioBlob}
              disabled={isSubmitting}
            />
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={canSubmit ? 'btn-primary px-8' : 'btn-disabled px-8'}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Decision'}
          </button>
        </div>
      </div>
    </div>
  );
}
