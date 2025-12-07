// Audio recording utilities

export interface AudioRecorderOptions {
  mimeType?: string;
  audioBitsPerSecond?: number;
}

export function getSupportedMimeType(): string {
  const types = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/ogg;codecs=opus',
    'audio/mp4',
  ];

  for (const type of types) {
    if (MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }

  return '';
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function validateAudioBlob(blob: Blob, maxSizeMB: number = 5): {
  valid: boolean;
  error?: string;
} {
  const sizeMB = blob.size / (1024 * 1024);

  if (sizeMB > maxSizeMB) {
    return {
      valid: false,
      error: `Audio file is too large (${sizeMB.toFixed(2)}MB). Maximum size is ${maxSizeMB}MB.`,
    };
  }

  if (blob.size === 0) {
    return {
      valid: false,
      error: 'Audio file is empty.',
    };
  }

  return { valid: true };
}

export async function checkMicrophonePermission(): Promise<{
  granted: boolean;
  error?: string;
}> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach(track => track.stop());
    return { granted: true };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        return {
          granted: false,
          error: 'Microphone permission denied. Please enable microphone access in your browser settings.',
        };
      }
      if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        return {
          granted: false,
          error: 'No microphone found. Please connect a microphone and try again.',
        };
      }
      return {
        granted: false,
        error: `Microphone error: ${error.message}`,
      };
    }
    return {
      granted: false,
      error: 'Unknown error accessing microphone.',
    };
  }
}
