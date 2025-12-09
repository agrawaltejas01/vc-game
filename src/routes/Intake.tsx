import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import { createInvestorProfile } from '../api/endpoints';
import { InvestorProfile } from '../types/investor';
import { InvestorIntakeForm } from '../components/intake/InvestorIntakeForm';
import { LoadingSpinner } from '../components/game/LoadingSpinner';

export function Intake() {
  const navigate = useNavigate();
  const { setInvestorProfile, setCurrentScenario, setLoading, setError } = useGameContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (profile: InvestorProfile) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setLoading(true);

    try {
      const response = await createInvestorProfile(profile);
      // Response includes: { gameId, scenario, currentQuestionIndex }
      setInvestorProfile(profile, response.gameId);
      setCurrentScenario(response.scenario);  // Set first scenario
      setError(null);
      navigate('/game');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to create investor profile';
      setSubmitError(errorMessage);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  if (isSubmitting) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Setting up your game..." />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black mb-3">
            Investor Profile
          </h2>
          <p className="text-gray-600">
            Tell us about your investment preferences. This helps us tailor the scenarios and understand your decision patterns.
          </p>
        </div>

        {submitError && (
          <div className="mb-6 p-4 bg-semantic-errorLight border-2 border-semantic-error rounded-lg">
            <p className="text-semantic-error text-sm font-semibold">{submitError}</p>
          </div>
        )}

        <InvestorIntakeForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
