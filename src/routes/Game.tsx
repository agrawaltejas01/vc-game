import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/GameContext";
import { submitAndGetNext } from "../api/endpoints";
import { ScenarioView } from "../components/game/ScenarioView";
import { InvestorVector } from "../components/game/InvestorVector";
import { LoadingSpinner } from "../components/game/LoadingSpinner";
import { LoadingOverlay } from "../components/common/LoadingOverlay";
import { ProgressBar } from "../components/game/ProgressBar";
import { scrollToTop } from "../utils/scrollToTop";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/common/Toast";
import { CelebrationModal } from "../components/game/CelebrationModal";
import { isFeatureEnabled } from "../config/engagementFeatures";

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
    hasSeenVector,
    setHasSeenVector,
  } = useGameContext();

  // Toast notifications
  const { toasts, showToast, dismissToast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"scenario" | "profile">(
    "scenario"
  );

  // Engagement modals and alerts
  const [showMidpointModal, setShowMidpointModal] = useState(false);
  const [showPreFinalAlert, setShowPreFinalAlert] = useState(false);
  const [vectorHighlight, setVectorHighlight] = useState(false);
  const [showVectorNotificationDot, setShowVectorNotificationDot] = useState(false);
  const vectorNotificationTimerRef = useRef<number | null>(null);

  // Warn user before refresh/close to prevent losing progress
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Only show warning if game is in progress
      if (gameId && currentScenario) {
        e.preventDefault();
        // Modern browsers ignore custom messages and show default warning
        // But we still need to set returnValue for the warning to appear
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [gameId, currentScenario]);

  // Simple redirect if no game in progress
  useEffect(() => {
    if (!gameId || !currentScenario) {
      navigate("/intake");
    }
  }, [gameId, currentScenario, navigate]);

  // Scroll to top when scenario changes
  useEffect(() => {
    if (currentScenario) {
      scrollToTop();
    }
  }, [currentScenario?.scenario_id]);

  // Scroll to top when mobile tab changes
  useEffect(() => {
    // Only scroll on mobile when switching tabs
    if (window.innerWidth < 1024) {  // lg breakpoint
      scrollToTop();
    }
  }, [activeTab]);

  // Cleanup notification timer on unmount
  useEffect(() => {
    return () => {
      if (vectorNotificationTimerRef.current) {
        clearTimeout(vectorNotificationTimerRef.current);
      }
    };
  }, []);

  const handleSubmitResponse = async (
    _decision: "pass" | "invest",
    textResponse?: string,
    audioBlob?: Blob
  ) => {
    if (!gameId) {
      setSubmissionError("Game session not found");
      return;
    }

    // Validation is now handled by ScenarioView's canSubmit
    // Skip is allowed, so no need to require text/audio here

    setIsSubmitting(true);
    setSubmissionError(null);
    setLoading(true);

    try {
      const response = await submitAndGetNext({
        gameId,
        currentQuestionIndex: gameState.current_index, // Starts at 1 for first submission
        textResponse,
        audioBlob,
      });

      if (
        response.gameCompleted ||
        // Revert before pushing -- gameState.max_scenarios
        gameState.current_index + 1 >= gameState.max_scenarios
      ) {
        // Game complete
        completeGame();
        navigate("/summary");
      } else if (response.scenario) {
        // Move to next scenario
        setCurrentScenario(response.scenario);
        if (response.scenario.investor_vector) {
          setInvestorVector(response.scenario.investor_vector);
        }
        incrementScenarioIndex();

        // Engagement nudges based on scenario progression
        const nextIndex = gameState.current_index + 1;

        // Feature 1 & 2: First decision toast + vector highlight
        if (nextIndex === 1 && isFeatureEnabled('showFirstDecisionToast') && !hasSeenVector) {
          showToast({
            message: "✨ Your Decision Vector is Live!",
            description: "Your investment preferences are being revealed in real-time",
            type: "info",
            action: {
              label: window.innerWidth < 1024 ? "Switch to Vector tab" : "Check it out →",
              onClick: () => {
                if (window.innerWidth < 1024) {
                  setActiveTab('profile');
                }
              }
            }
          });
          setHasSeenVector(true);

          if (isFeatureEnabled('showVectorPanelHighlight')) {
            setVectorHighlight(true);
            setTimeout(() => setVectorHighlight(false), 2000);
          }
        }

        // Feature 6: Midpoint celebration
        if (nextIndex === 3 && isFeatureEnabled('showMidpointCelebration')) {
          setShowMidpointModal(true);
        }

        // Feature 9: Pre-final alert
        if (nextIndex === 4 && isFeatureEnabled('showPreFinalAlert')) {
          setShowPreFinalAlert(true);
        }

        // Feature 16: Mobile vector notification dot
        if (
          isFeatureEnabled('showMobileVectorNotificationDot') &&
          window.innerWidth < 1024 &&
          activeTab === 'scenario'
        ) {
          setShowVectorNotificationDot(true);

          // Auto-dismiss after 5 seconds
          if (vectorNotificationTimerRef.current) {
            clearTimeout(vectorNotificationTimerRef.current);
          }
          vectorNotificationTimerRef.current = setTimeout(() => {
            setShowVectorNotificationDot(false);
          }, 5000);
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to submit response";
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

  // Enhanced loading messages for final submission
  const finalLoadingMessages = [
    "Analyzing your 5 investment decisions...",
    "Comparing stated vs revealed preferences...",
    "Identifying your investor archetype...",
    "Calculating alignment scores...",
    "Generating personalized insights...",
    "✓ Profile Complete!"
  ];

  // Check if this is the final submission
  const isFinalSubmission = isSubmitting && gameState.current_index + 1 >= gameState.max_scenarios;

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-50 flex flex-col">
      <LoadingOverlay
        show={isSubmitting}
        messages={isFinalSubmission ? finalLoadingMessages : undefined}
        minDuration={isFinalSubmission ? 5000 : undefined}
      />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <ProgressBar
        current={gameState.current_index + 1}
        total={gameState.max_scenarios}
      />

      {/* Pre-Final Alert Banner */}
      {showPreFinalAlert && isFeatureEnabled('showPreFinalAlert') && (
        <div className="card-accent-gold mx-4 mb-4 animate-slide-down relative">
          <button
            onClick={() => setShowPreFinalAlert(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
            aria-label="Close alert"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <h4 className="font-bold text-black mb-2">⚡ Final Scenario Coming Up!</h4>
          <p className="text-sm text-gray-700">
            One more decision and you'll unlock your complete Investor Archetype Profile.
          </p>
        </div>
      )}

      {/* Midpoint Celebration Modal */}
      <CelebrationModal
        isOpen={showMidpointModal}
        title="Halfway There!"
        message="You've made 3 investment decisions. Your revealed preferences are taking shape..."
        emoji="🎯"
        progressPercent={60}
        primaryAction={{
          label: "Continue Investing",
          onClick: () => setShowMidpointModal(false)
        }}
        secondaryAction={window.innerWidth < 1024 ? {
          label: "View Vector",
          onClick: () => {
            setShowMidpointModal(false);
            setActiveTab('profile');
          }
        } : undefined}
        onClose={() => setShowMidpointModal(false)}
      />

      {/* Mobile Tabs (visible on small screens) */}
      <div className="lg:hidden border-b border-gray-200 bg-white">
        <div className="flex">
          <button
            onClick={() => setActiveTab("scenario")}
            className={`
              flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors
              ${
                activeTab === "scenario"
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }
            `}
          >
            Investment Scenario
          </button>
          <button
            onClick={() => {
              setActiveTab("profile");
              // Dismiss notification dot when user views vector
              setShowVectorNotificationDot(false);
              if (vectorNotificationTimerRef.current) {
                clearTimeout(vectorNotificationTimerRef.current);
              }
            }}
            className={`
              flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors relative
              ${
                activeTab === "profile"
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }
            `}
          >
            Your Decision Vector
            {showVectorNotificationDot && isFeatureEnabled('showMobileVectorNotificationDot') && (
              <span
                className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full animate-pulse-dot"
                aria-label="New updates available"
              />
            )}
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
              ${activeTab === "scenario" ? "block" : "hidden lg:block"}
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
              ${activeTab === "profile" ? "block" : "hidden lg:block"}
              ${vectorHighlight && isFeatureEnabled('showVectorPanelHighlight') ? 'animate-pulse-border border-3' : ''}
            `}
          >
            <InvestorVector vector={investorVector} />
          </div>
        </div>
      </div>
    </div>
  );
}
