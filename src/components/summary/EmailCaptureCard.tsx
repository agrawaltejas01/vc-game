import { useState } from 'react';
import { useGameContext } from '../../context/GameContext';
import { submitEmail } from '../../api/endpoints';

export function EmailCaptureCard() {
  const { gameId } = useGameContext();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      // Validate gameId exists
      if (!gameId) {
        throw new Error('Game session not found. Please try again.');
      }

      // Submit email to API
      await submitEmail(gameId, email);

      // Show success state
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : 'Failed to submit email. Please try again.');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <div className="card">
      <div className="text-center space-y-4">
        <p className="text-gray-700 text-lg">
          Interested in more? Share your email to know how far this can go.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
          <div>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="your@email.com"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                error
                  ? 'border-semantic-error focus:ring-semantic-error'
                  : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {error && (
              <p className="text-semantic-error text-sm mt-1 text-left">{error}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={!email.trim() || isSubmitting || isSuccess}
            className={`w-full px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
              isSuccess
                ? 'bg-semantic-success text-white cursor-default'
                : 'btn-primary disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            {isSuccess ? 'Submitted!' : isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          <p className="text-gray-700 text-sm">
            Ping us on LinkedIn -{' '}
            <a
              href="https://www.linkedin.com/in/shubhamkhetan/?utm_source=share"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-800 underline"
            >
              Shubham
            </a>
            {' '}and{' '}
            <a
              href="https://www.linkedin.com/in/agrawaltejas01/?utm_source=share"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-800 underline"
            >
              Tejas
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
