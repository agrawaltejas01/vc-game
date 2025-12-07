import { AudioRecorder } from './AudioRecorder';

interface ResponseInputProps {
  textValue: string;
  onTextChange: (value: string) => void;
  audioBlob: Blob | null;
  onAudioChange: (blob: Blob | null) => void;
  disabled?: boolean;
}

export function ResponseInput({
  textValue,
  onTextChange,
  audioBlob,
  onAudioChange,
  disabled = false,
}: ResponseInputProps) {
  return (
    <div className="space-y-4">
      {/* Text Response */}
      <div>
        <label className="label">
          Type your response
        </label>
        <textarea
          value={textValue}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Type your reasoning as if you're leaving a note to your partners..."
          disabled={disabled}
          rows={6}
          className="input resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">
          {textValue.length} characters
        </p>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>

      {/* Audio Response */}
      <div>
        <label className="label">
          Record an audio note
        </label>
        <AudioRecorder
          audioBlob={audioBlob}
          onAudioChange={onAudioChange}
          disabled={disabled}
        />
      </div>

      <p className="text-sm text-gray-600 italic">
        You can provide a text response, audio response, or both.
      </p>
    </div>
  );
}
