import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import { getGameSummary } from '../api/endpoints';
import { ArchetypeCard } from '../components/summary/ArchetypeCard';
import { EmailCaptureCard } from '../components/summary/EmailCaptureCard';
import { DecisionPatterns } from '../components/summary/DecisionPatterns';
import { LoadingOverlay } from '../components/common/LoadingOverlay';
import { scrollToTop } from '../utils/scrollToTop';
import { isFeatureEnabled } from '../config/engagementFeatures';

export function Summary() {
  const navigate = useNavigate();
  const { gameId, investorProfile, gameSummary, setGameSummary, resetGame } = useGameContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Staggered reveal state
  const [showSections, setShowSections] = useState({
    archetype: false,
    emailCapture: false,
    patterns: false,
    comparison: false,
    breakdown: false,
    actions: false
  });

  // Scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);

  // Warn user before refresh/close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Scroll to top when summary loads and trigger staggered reveal
  useEffect(() => {
    if (gameSummary) {
      scrollToTop();

      // Trigger staggered reveal if feature is enabled
      if (!isFeatureEnabled('showSummaryStaggeredReveal')) {
        setShowSections({
          archetype: true,
          emailCapture: true,
          patterns: true,
          comparison: true,
          breakdown: true,
          actions: true
        });
        return;
      }

      // Staggered reveal sequence
      setTimeout(() => setShowSections(prev => ({ ...prev, archetype: true })), 200);
      setTimeout(() => setShowSections(prev => ({ ...prev, emailCapture: true })), 450);
      setTimeout(() => setShowSections(prev => ({ ...prev, patterns: true })), 700);
      setTimeout(() => setShowSections(prev => ({ ...prev, comparison: true })), 1000);
      setTimeout(() => setShowSections(prev => ({ ...prev, breakdown: true })), 1300);
      setTimeout(() => setShowSections(prev => ({ ...prev, actions: true })), 1600);
    }
  }, [gameSummary]);

  useEffect(() => {
    if (!gameId) {
      navigate('/intake');
      return;
    }

    // Only fetch if we don't already have the summary
    if (gameSummary) {
      return;
    }

    const loadSummary = async () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);

  const handlePlayAgain = () => {
    resetGame();
    navigate('/intake');
  };

  if (isLoading || !gameSummary) {
    return <LoadingOverlay show={true} />;
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <p className="text-semantic-error">{error}</p>
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
            Your Intuition Profile
          </h2>
          <p className="text-gray-600">
            Based on your responses to the scenarios
          </p>
        </div>

        {/* Archetype Card */}
        {showSections.archetype && (
          <div className="animate-scale-in">
            <ArchetypeCard
              archetypeName={gameSummary.archetype_name}
              description={gameSummary.archetype_description}
            />
          </div>
        )}

        {/* Email Capture */}
        {showSections.emailCapture && (
          <div className="animate-scale-in">
            <EmailCaptureCard />
          </div>
        )}

        {/* Decision Patterns */}
        {showSections.patterns && (
          <div className="animate-slide-up">
            <DecisionPatterns patterns={gameSummary.decision_patterns} />
          </div>
        )}

        {/* Comparison to Initial Preferences */}
        {investorProfile && gameSummary.comparison_to_initial.length > 0 && showSections.comparison && (
          <div className="card animate-slide-up">
            <h3 className="text-xl font-bold text-black mb-4">
              Stated vs. Revealed Preferences
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Your actual decisions compared to your initial stated preferences
            </p>
            <div className="space-y-4">
              {gameSummary.comparison_to_initial.map((comparison, idx) => (
                <div key={idx} className="border-l-4 border-gray-300 pl-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                    <div>
                      <p className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Stated</p>
                      <p className="text-sm text-black">{comparison.stated_preference}</p>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Revealed</p>
                        <span
                          className={`px-2 py-1 text-xs rounded-full border-2 ${
                            comparison.alignment === 'aligned'
                              ? 'bg-semantic-successLight text-gray'
                              : comparison.alignment === 'partially_aligned'
                              ? 'bg-accent-gold-light text-gray'
                              : 'bg-semantic-errorLight text-gray'
                          } ${
                            isFeatureEnabled('showAlignmentBadgeAnimations')
                              ? comparison.alignment === 'aligned'
                                ? 'animate-scale-bounce'
                                : comparison.alignment === 'misaligned'
                                ? 'animate-shake'
                                : ''
                              : ''
                          }`}
                        >
                          {comparison.alignment.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-black">{comparison.revealed_preference}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-2 italic">{comparison.insights}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Evaluation Breakdown Chart */}
        {showSections.breakdown && (
          <div className="card animate-slide-up">
            <h3 className="text-xl font-bold text-black mb-4">
              Revealed Evaluation Weights
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700 font-medium">Founders/ Team</span>
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
                  <span className="text-gray-700 font-medium">Sector/ Market</span>
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
                  <span className="text-gray-700 font-medium">Traction/ Metrics</span>
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
                  <span className="text-gray-700 font-medium">Product/ Technology</span>
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
                  <span className="text-gray-700 font-medium">Round Dynamics (valuation, lead, etc.)</span>
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
        )}

        {/* Actions */}
        {showSections.actions && (
          <div className="flex justify-center space-x-4 pt-4 animate-fade-in">
            <button onClick={handlePlayAgain} className="btn-primary px-8">
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
