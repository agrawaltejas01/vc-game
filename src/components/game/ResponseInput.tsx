import { AudioRecorder } from './AudioRecorder';

interface ResponseInputProps {
  textValue: string;
  onTextChange: (value: string) => void;
  audioBlob: Blob | null;
  onAudioChange: (blob: Blob | null) => void;
  textActive: boolean;
  audioActive: boolean;
  onTextToggle: () => void;
  onAudioToggle: () => void;
  disabled?: boolean;
}

export function ResponseInput({
  textValue,
  onTextChange,
  audioBlob,
  onAudioChange,
  textActive,
  audioActive,
  onTextToggle,
  onAudioToggle,
  disabled = false,
}: ResponseInputProps) {
  // State is now managed by parent component

  return (
    <div className="space-y-4">
      {/* Heading */}
      <h4 className="text-lg font-bold text-black">Add your rationale</h4>

      {/* Toggle Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={onTextToggle}
          disabled={disabled}
          className={`
            py-4 px-4 rounded-lg font-semibold transition-all
            flex flex-col items-center space-y-2
            ${
              textActive
                ? 'border-3 border-primary-500 bg-primary-50 text-black shadow-sm'
                : 'border-2 border-gray-300 bg-white text-black hover:border-black hover:bg-gray-50'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {/* Text Icon */}
          <svg
            className={`w-6 h-6 ${textActive ? 'text-primary-500' : 'text-gray-600'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Text</span>
        </button>

        <button
          type="button"
          onClick={onAudioToggle}
          disabled={disabled}
          className={`
            py-4 px-4 rounded-lg font-semibold transition-all
            flex flex-col items-center space-y-2
            ${
              audioActive
                ? 'border-3 border-primary-500 bg-primary-50 text-black shadow-sm'
                : 'border-2 border-gray-300 bg-white text-black hover:border-black hover:bg-gray-50'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {/* Audio Icon */}
          <svg
            className={`w-6 h-6 ${audioActive ? 'text-primary-500' : 'text-gray-600'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          <span>Audio</span>
        </button>
      </div>

      {/* Text Input Area (conditional) */}
      {textActive && (
        <div className="space-y-2">
          <textarea
            value={textValue}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Type your reasoning as if you're leaving a note to your partners..."
            disabled={disabled}
            rows={6}
            className="input resize-none"
          />
          <p className="text-xs text-gray-500">
            {textValue.length} characters
          </p>
        </div>
      )}

      {/* Audio Recorder (conditional) */}
      {audioActive && (
        <div>
          <AudioRecorder
            audioBlob={audioBlob}
            onAudioChange={onAudioChange}
            disabled={disabled}
          />
        </div>
      )}

      {/* Helper Text (when both active) */}
      {textActive && audioActive && (
        <p className="text-sm text-gray-600 italic">
          You've added both text and audio
        </p>
      )}
    </div>
  );
}
