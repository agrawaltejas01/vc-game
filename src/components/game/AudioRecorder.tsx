import { useState, useRef, useEffect } from 'react';
import { useAudioRecorder } from '../../hooks/useAudioRecorder';

interface AudioRecorderProps {
  audioBlob: Blob | null;
  onAudioChange: (blob: Blob | null) => void;
  disabled?: boolean;
}

export function AudioRecorder({ audioBlob, onAudioChange, disabled = false }: AudioRecorderProps) {
  const {
    state,
    duration,
    durationFormatted,
    audioBlob: recordedBlob,
    error,
    startRecording,
    stopRecording,
    deleteRecording,
    reset,
  } = useAudioRecorder();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // Sync recorded blob to parent
  useEffect(() => {
    if (recordedBlob && recordedBlob !== audioBlob) {
      onAudioChange(recordedBlob);
    }
  }, [recordedBlob]);

  // Create and cleanup object URL for audio playback
  useEffect(() => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      // Cleanup function to revoke URL when component unmounts or audioBlob changes
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setAudioUrl(null);
    }
  }, [audioBlob]);

  const handleStartRecording = async () => {
    const started = await startRecording();
    if (!started && error) {
      console.error('Failed to start recording:', error);
    }
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  const handleDelete = () => {
    deleteRecording();
    onAudioChange(null);
    setIsPlaying(false);
  };

  const handleReRecord = () => {
    reset();
    onAudioChange(null);
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-3">
      {/* Ready State */}
      {state === 'idle' && (
        <button
          type="button"
          onClick={handleStartRecording}
          disabled={disabled}
          className={disabled ? 'btn-disabled w-full' : 'btn-outline w-full flex items-center justify-center space-x-2'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          <span>Record Audio</span>
        </button>
      )}

      {/* Recording State */}
      {state === 'recording' && (
        <div className="card bg-semantic-errorLight border-3 border-semantic-error">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-semantic-error rounded-full animate-pulse-red"></div>
              <span className="font-mono text-lg font-bold text-semantic-error">
                {durationFormatted}
              </span>
            </div>
            <button
              type="button"
              onClick={handleStopRecording}
              className="btn-primary bg-semantic-error hover:bg-red-700"
            >
              Stop Recording
            </button>
          </div>
          {duration >= 150 && (
            <p className="text-sm text-semantic-error mt-2 font-semibold">
              ⚠️ Approaching 3-minute limit
            </p>
          )}
        </div>
      )}

      {/* Recorded State */}
      {state === 'recorded' && audioBlob && (
        <div className="card bg-semantic-successLight border-3 border-semantic-success">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-semantic-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-semantic-success">
                  Recording saved ({durationFormatted})
                </span>
              </div>
            </div>

            {/* Audio Player */}
            {audioUrl && (
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={togglePlayback}
                  className="btn-outline flex items-center space-x-2"
                >
                  {isPlaying ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>

                <audio
                  ref={audioRef}
                  src={audioUrl}
                  onEnded={() => setIsPlaying(false)}
                  onPause={() => setIsPlaying(false)}
                  className="hidden"
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleReRecord}
                className="btn-secondary flex-1"
              >
                Re-record
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="btn-outline text-semantic-error border-semantic-error hover:bg-semantic-errorLight font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {state === 'error' && error && (
        <div className="card bg-semantic-errorLight border-3 border-semantic-error">
          <div className="space-y-3">
            <p className="text-semantic-error text-sm font-semibold">{error}</p>
            <button
              type="button"
              onClick={handleReRecord}
              className="btn-secondary w-full"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
