import { useState } from 'react';
import { Scenario } from '../../types/scenario';
import { ScenarioDetails } from './ScenarioDetails';
import { ResponseInput } from './ResponseInput';

interface ScenarioViewProps {
  scenario: Scenario;
  onSubmit: (textResponse?: string, audioBlob?: Blob) => void;
  isSubmitting: boolean;
  error: string | null;
}

export function ScenarioView({ scenario, onSubmit, isSubmitting, error }: ScenarioViewProps) {
  const [textResponse, setTextResponse] = useState('');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const canSubmit = (textResponse.trim().length > 0 || audioBlob !== null) && !isSubmitting;

  const handleSubmit = () => {
    if (!canSubmit) return;

    onSubmit(
      textResponse.trim().length > 0 ? textResponse : undefined,
      audioBlob || undefined
    );

    // Reset form
    setTextResponse('');
    setAudioBlob(null);
  };

  return (
    <div className="py-8 px-6 space-y-8">
      <ScenarioDetails scenario={scenario} />

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Response</h3>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <ResponseInput
          textValue={textResponse}
          onTextChange={setTextResponse}
          audioBlob={audioBlob}
          onAudioChange={setAudioBlob}
          disabled={isSubmitting}
        />

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={canSubmit ? 'btn-primary' : 'btn-disabled'}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Response'}
          </button>
        </div>
      </div>
    </div>
  );
}
