import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import { submitAndGetNext } from '../api/endpoints';
import { ScenarioView } from '../components/game/ScenarioView';
import { InvestorVector } from '../components/game/InvestorVector';
import { LoadingSpinner } from '../components/game/LoadingSpinner';

export function Game() {
  const navigate = useNavigate();
  const {
    gameId,
    gameState,
    currentScenario,
    investorVector,
    setCurrentScenario,
    setInvestorVector,
    incrementScenarioIndex,
    completeGame,
    setLoading,
    setError,
  } = useGameContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'scenario' | 'profile'>('scenario');

  // Redirect if no gameId or scenario (should come from Intake)
  useEffect(() => {
    if (!gameId || !currentScenario) {
      navigate('/intake');
    }
  }, [gameId, currentScenario, navigate]);

  const handleSubmitResponse = async (_decision: 'pass' | 'invest', audioBlob?: Blob) => {
    if (!gameId || !audioBlob) {
      setSubmissionError('Audio recording required');
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);
    setLoading(true);

    try {
      const response = await submitAndGetNext({
        gameId,
        currentQuestionIndex: gameState.current_index ,  // Starts at 1 for first submission
        audioBlob,
      });

      if (response.gameCompleted) {
        // Game complete
        completeGame();
        navigate('/summary');
      } else if (response.scenario) {
        // Move to next scenario
        setCurrentScenario(response.scenario);
        if (response.scenario.investor_vector) {
          setInvestorVector(response.scenario.investor_vector);
        }
        incrementScenarioIndex();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to submit response';
      setSubmissionError(errorMessage);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  if (!currentScenario) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-50 flex flex-col">
      {/* Mobile Tabs (visible on small screens) */}
      <div className="lg:hidden border-b border-gray-200 bg-white">
        <div className="flex">
          <button
            onClick={() => setActiveTab('scenario')}
            className={`
              flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors
              ${
                activeTab === 'scenario'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }
            `}
          >
            Scenario
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`
              flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors
              ${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }
            `}
          >
            Your Profile
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {/* Split-screen layout with independent scrolling (desktop) */}
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left: Scenario (60%) */}
          <div
            className={`
              lg:w-3/5 h-full overflow-y-auto
              ${activeTab === 'scenario' ? 'block' : 'hidden lg:block'}
            `}
          >
            <ScenarioView
              scenario={currentScenario}
              onSubmit={handleSubmitResponse}
              isSubmitting={isSubmitting}
              error={submissionError}
            />
          </div>

          {/* Right: Investor Vector (40%) */}
          <div
            className={`
              lg:w-2/5 h-full border-t lg:border-t-0 lg:border-l border-gray-200 bg-white overflow-y-auto
              ${activeTab === 'profile' ? 'block' : 'hidden lg:block'}
            `}
          >
            <InvestorVector vector={investorVector} />
          </div>
        </div>
      </div>
    </div>
  );
}
