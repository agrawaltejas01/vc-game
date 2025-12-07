import { useState, useRef, useCallback } from 'react';
import { getSupportedMimeType, formatDuration, validateAudioBlob, checkMicrophonePermission } from '../utils/audio';

type RecordingState = 'idle' | 'recording' | 'recorded' | 'error';

export function useAudioRecorder() {
  const [state, setState] = useState<RecordingState>('idle');
  const [duration, setDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const startRecording = useCallback(async () => {
    setError(null);

    // Check microphone permission
    const permissionCheck = await checkMicrophonePermission();
    if (!permissionCheck.granted) {
      setError(permissionCheck.error || 'Microphone access denied');
      setState('error');
      return false;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = getSupportedMimeType();

      if (!mimeType) {
        setError('Your browser does not support audio recording');
        setState('error');
        return false;
      }

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType,
        audioBitsPerSecond: 16000, // 16kHz for voice
      });

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        const validation = validateAudioBlob(blob);

        if (!validation.valid) {
          setError(validation.error || 'Invalid audio recording');
          setState('error');
          return;
        }

        setAudioBlob(blob);
        setState('recorded');

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());

        // Stop timer
        if (timerRef.current !== null) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setState('recording');
      startTimeRef.current = Date.now();

      // Start duration timer
      timerRef.current = window.setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        setDuration(elapsed);

        // Auto-stop at 3 minutes
        if (elapsed >= 180) {
          stopRecording();
        }
      }, 100);

      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to start recording';
      setError(errorMessage);
      setState('error');
      return false;
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  }, []);

  const deleteRecording = useCallback(() => {
    setAudioBlob(null);
    setDuration(0);
    setState('idle');
    setError(null);
  }, []);

  const reset = useCallback(() => {
    if (mediaRecorderRef.current) {
      if (mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      mediaRecorderRef.current = null;
    }

    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    audioChunksRef.current = [];
    setAudioBlob(null);
    setDuration(0);
    setState('idle');
    setError(null);
  }, []);

  return {
    state,
    duration,
    durationFormatted: formatDuration(duration),
    audioBlob,
    error,
    startRecording,
    stopRecording,
    deleteRecording,
    reset,
  };
}
