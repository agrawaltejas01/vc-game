import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import { getNextScenario, submitScenarioResponse } from '../api/endpoints';
import { ScenarioView } from '../components/game/ScenarioView';
import { InvestorVector } from '../components/game/InvestorVector';
import { LoadingSpinner } from '../components/game/LoadingSpinner';

export function Game() {
  const navigate = useNavigate();
  const {
    investorId,
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

  const [isLoadingScenario, setIsLoadingScenario] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'scenario' | 'profile'>('scenario');

  // Load first scenario on mount or when scenario index changes
  useEffect(() => {
    if (!investorId) {
      navigate('/intake');
      return;
    }

    const loadScenario = async () => {
      setIsLoadingScenario(true);
      setError(null);

      try {
        const response = await getNextScenario(gameState);
        setCurrentScenario(response.scenario);
        setInvestorVector(response.investor_vector);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to load scenario';
        setError(errorMessage);
      } finally {
        setIsLoadingScenario(false);
      }
    };

    if (!currentScenario || currentScenario.scenario_index !== gameState.current_index) {
      loadScenario();
    }
  }, [gameState.current_index, investorId]);

  const handleSubmitResponse = async (decision: 'pass' | 'invest', audioBlob?: Blob) => {
    if (!investorId || !currentScenario) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);
    setLoading(true);

    try {
      const response = await submitScenarioResponse({
        investor_id: investorId,
        scenario_id: currentScenario.scenario_id,
        decision: decision,
        audio_response: audioBlob,
      });

      setInvestorVector(response.updated_vector);

      if (response.has_more) {
        // Move to next scenario
        incrementScenarioIndex();
      } else {
        // Game complete
        completeGame();
        navigate('/summary');
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

  if (isLoadingScenario || !currentScenario) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading scenario..." />
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
