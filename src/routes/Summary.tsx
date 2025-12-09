import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import { getGameSummary } from '../api/endpoints';
import { ArchetypeCard } from '../components/summary/ArchetypeCard';
import { DecisionPatterns } from '../components/summary/DecisionPatterns';
import { LoadingSpinner } from '../components/game/LoadingSpinner';

export function Summary() {
  const navigate = useNavigate();
  const { gameId, investorProfile, gameSummary, setGameSummary, resetGame } = useGameContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!gameId) {
      navigate('/intake');
      return;
    }

    const loadSummary = async () => {
      if (gameSummary) {
        return; // Already loaded
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await getGameSummary(gameId);
        setGameSummary(response.summary);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to load summary';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadSummary();
  }, [gameId, gameSummary, setGameSummary, navigate]);

  const handlePlayAgain = () => {
    resetGame();
    navigate('/intake');
  };

  if (isLoading || !gameSummary) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Analyzing your decisions..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <p className="text-red-600">{error}</p>
          <button onClick={handlePlayAgain} className="btn-primary">
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-black mb-3">
            Your Investor Profile
          </h2>
          <p className="text-gray-600">
            Based on your responses to {investorProfile ? 'the scenarios' : '6 scenarios'}
          </p>
        </div>

        {/* Archetype Card */}
        <ArchetypeCard
          archetypeName={gameSummary.archetype_name}
          description={gameSummary.archetype_description}
        />

        {/* Decision Patterns */}
        <DecisionPatterns patterns={gameSummary.decision_patterns} />

        {/* Comparison to Initial Preferences */}
        {investorProfile && gameSummary.comparison_to_initial.length > 0 && (
          <div className="card">
            <h3 className="text-xl font-bold text-black mb-4">
              Stated vs. Revealed Preferences
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              How your actual decisions compared to your initial stated preferences
            </p>
            <div className="space-y-4">
              {gameSummary.comparison_to_initial.map((comparison, idx) => (
                <div key={idx} className="border-l-4 border-gray-300 pl-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                    <div>
                      <p className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Stated</p>
                      <p className="text-sm text-black">{comparison.stated_preference}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Revealed</p>
                      <p className="text-sm text-black">{comparison.revealed_preference}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-bold rounded-full border-2 ${
                        comparison.alignment === 'aligned'
                          ? 'bg-semantic-successLight text-semantic-success border-semantic-success'
                          : comparison.alignment === 'partially_aligned'
                          ? 'bg-accent-gold-light text-accent-gold border-accent-gold'
                          : 'bg-semantic-errorLight text-semantic-error border-semantic-error'
                      }`}
                    >
                      {comparison.alignment.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-2 italic">{comparison.insights}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Evaluation Breakdown Chart */}
        <div className="card">
          <h3 className="text-xl font-bold text-black mb-4">
            Your Revealed Evaluation Weights
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700 font-medium">Founders / Team</span>
                <span className="font-bold text-black">
                  {gameSummary.evaluation_breakdown.founders}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-black h-4 rounded-full transition-all"
                  style={{ width: `${gameSummary.evaluation_breakdown.founders}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700 font-medium">Sector / Market</span>
                <span className="font-bold text-black">
                  {gameSummary.evaluation_breakdown.sector_market}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-black h-4 rounded-full transition-all"
                  style={{ width: `${gameSummary.evaluation_breakdown.sector_market}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700 font-medium">Traction</span>
                <span className="font-bold text-black">
                  {gameSummary.evaluation_breakdown.traction}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-black h-4 rounded-full transition-all"
                  style={{ width: `${gameSummary.evaluation_breakdown.traction}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700 font-medium">Product / Technology</span>
                <span className="font-bold text-black">
                  {gameSummary.evaluation_breakdown.product_tech}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-black h-4 rounded-full transition-all"
                  style={{ width: `${gameSummary.evaluation_breakdown.product_tech}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700 font-medium">Round Dynamics</span>
                <span className="font-bold text-black">
                  {gameSummary.evaluation_breakdown.round_dynamics}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-black h-4 rounded-full transition-all"
                  style={{ width: `${gameSummary.evaluation_breakdown.round_dynamics}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-4 pt-4">
          <button onClick={handlePlayAgain} className="btn-primary px-8">
            Play Again
          </button>
          <button disabled className="btn-disabled">
            Share Results (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}
