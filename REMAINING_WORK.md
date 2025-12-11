# Remaining Integration Work

## Current Status

### ✅ Completed (Foundation - ALL READY)
1. Feature flag system
2. All CSS animations (15 animations)
3. Toast notification component + hook
4. Celebration Modal component
5. Badge component
6. Enhanced Progress Bar (**VISIBLE NOW**)
7. GameContext tracking state

### ⏳ Remaining Integrations (5 files to update)

---

## File 1: Game.tsx - Main Orchestration

**What needs to be added:**

### A. Import statements
```typescript
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/common/Toast';
import { CelebrationModal } from '../components/game/CelebrationModal';
import { isFeatureEnabled } from '../config/engagementFeatures';
```

### B. Add toast state
```typescript
const { toasts, showToast, dismissToast } = useToast();
```

### C. Add modal states
```typescript
const [showMidpointModal, setShowMidpointModal] = useState(false);
const [showPreFinalAlert, setShowPreFinalAlert] = useState(false);
const [vectorHighlight, setVectorHighlight] = useState(false);
```

### D. In handleSubmitResponse (after line 94)
```typescript
// After setting next scenario
const nextIndex = gameState.current_index + 1;

// Feature 1 & 2: First decision toast + vector highlight
if (nextIndex === 1 && isFeatureEnabled('showFirstDecisionToast') && !hasSeenVector) {
  showToast({
    message: "✨ Your Decision Vector is Live!",
    description: "Your investment preferences are being revealed in real-time",
    type: "info",
    action: {
      label: window.innerWidth < 1024 ? "Switch to Vector tab" : "Check it out →",
      onClick: () => window.innerWidth < 1024 ? setActiveTab('profile') : null
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
```

### E. Add toast container to JSX (before closing div)
```typescript
<ToastContainer toasts={toasts} onDismiss={dismissToast} />
```

### F. Add midpoint modal
```typescript
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
    onClick: () => { setShowMidpointModal(false); setActiveTab('profile'); }
  } : undefined}
  onClose={() => setShowMidpointModal(false)}
/>
```

### G. Add pre-final alert banner
```typescript
{showPreFinalAlert && isFeatureEnabled('showPreFinalAlert') && (
  <div className="card-accent-gold mx-4 mb-4 animate-slide-down relative">
    <button
      onClick={() => setShowPreFinalAlert(false)}
      className="absolute top-2 right-2 text-gray-500 hover:text-black"
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
```

### H. Add vector panel highlight class
```typescript
// On the investor vector div (line 174)
className={`
  lg:w-2/5 h-full border-t lg:border-t-0 lg:border-l border-gray-200 bg-white overflow-y-auto
  ${activeTab === "profile" ? "block" : "hidden lg:block"}
  ${vectorHighlight && isFeatureEnabled('showVectorPanelHighlight') ? 'animate-pulse-border border-3' : ''}
`}
```

### I. Feature 8: Mobile progress reminder (optional)
```typescript
{/* Mobile Progress Reminder - Feature 8 */}
{isFeatureEnabled('showMobileProgressReminder') && window.innerWidth < 1024 && activeTab === 'scenario' && (
  <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-300 px-4 py-2 flex justify-between items-center z-40">
    <span className="text-sm text-black font-medium">
      Scenario {gameState.current_index + 1} of {gameState.max_scenarios}
    </span>
    <button
      onClick={() => setActiveTab('profile')}
      className="text-sm text-primary-600 font-semibold hover:text-primary-700"
    >
      View Vector →
    </button>
  </div>
)}
```

---

## File 2: ScenarioView.tsx - Success Animation

**What needs to be added:**

### A. Add success animation state
```typescript
const [showSuccess, setShowSuccess] = useState(false);
```

### B. Update handleSubmit
```typescript
const handleSubmit = () => {
  if (!canSubmit || !decision) return;

  // Feature 3: Success animation
  if (isFeatureEnabled('showSuccessAnimation')) {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onSubmit(decision, textResponse.trim() || undefined, audioBlob || undefined);

      // Reset form
      setDecision(null);
      setTextResponse('');
      setAudioBlob(null);
      setSkipRationale(false);
      setTextActive(false);
      setAudioActive(false);
    }, 1500);
  } else {
    onSubmit(decision, textResponse.trim() || undefined, audioBlob || undefined);

    // Reset form
    setDecision(null);
    setTextResponse('');
    setAudioBlob(null);
    setSkipRationale(false);
    setTextActive(false);
    setAudioActive(false);
  }
};
```

### C. Update submit button JSX
```typescript
<button
  onClick={handleSubmit}
  disabled={!canSubmit}
  className={`
    ${canSubmit ? 'btn-primary px-8' : 'btn-disabled px-8'}
    ${showSuccess ? 'bg-semantic-success' : ''}
    transition-all duration-300
  `}
>
  {showSuccess ? (
    <svg className="w-6 h-6 animate-checkmark inline-block" fill="none" stroke="white" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  ) : (
    isSubmitting ? 'Submitting...' : 'Submit Decision'
  )}
</button>
```

---

## File 3: InvestorVector.tsx - Change Indicators, Badges, Tooltips

**What needs to be added:**

### A. Import statements
```typescript
import { Badge } from '../common/Badge';
import { isFeatureEnabled } from '../../config/engagementFeatures';
import { useGameContext } from '../../context/GameContext';
import { useState, useEffect } from 'react';
```

### B. Add state for metric changes
```typescript
const { previousMetrics, updatePreviousMetrics } = useGameContext();
const [metricChanges, setMetricChanges] = useState<Record<string, 'up' | 'down' | null>>({});
```

### C. Detect metric changes (useEffect)
```typescript
useEffect(() => {
  if (!vector || !vector.quantitative_metrics || !isFeatureEnabled('showMetricChangeIndicators')) return;

  if (previousMetrics) {
    const changes: Record<string, 'up' | 'down' | null> = {};
    Object.keys(vector.quantitative_metrics).forEach(key => {
      const current = vector.quantitative_metrics[key as keyof typeof vector.quantitative_metrics];
      const previous = previousMetrics[key as keyof typeof previousMetrics];
      if (current > previous) changes[key] = 'up';
      else if (current < previous) changes[key] = 'down';
      else changes[key] = null;
    });
    setMetricChanges(changes);

    // Clear after 3 seconds
    setTimeout(() => setMetricChanges({}), 3000);
  }

  updatePreviousMetrics(vector.quantitative_metrics);
}, [vector]);
```

### D. Update metric rendering
```typescript
{Object.entries(vector.quantitative_metrics).map(([key, value]) => (
  <div key={key} className="mb-4">
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm font-medium text-gray-700 capitalize">
        {key.replace(/_/g, ' ')}
      </span>
      <div className="flex items-center space-x-1">
        <span className="text-sm font-bold text-black">{Math.round(value)}%</span>
        {metricChanges[key] === 'up' && (
          <Badge text="↑" variant="change-up" color="primary" animate={true} />
        )}
        {metricChanges[key] === 'down' && (
          <Badge text="↓" variant="change-down" color="gray" animate={true} />
        )}
      </div>
    </div>
    {/* existing progress bar */}
  </div>
))}
```

### E. Add "NEW" badge to insights (if feature enabled)
```typescript
<div className="relative">
  {isFeatureEnabled('showNewInsightBadges') && (
    <Badge text="NEW" variant="new" color="primary" className="absolute top-0 right-0" />
  )}
  <h4 className="text-sm font-bold text-black mb-2">Emerging Insights</h4>
  {/* insights list with slide-in animation */}
</div>
```

### F. Pattern count badge
```typescript
<h4 className="text-sm font-bold text-black mb-2">
  Decision Patterns
  {isFeatureEnabled('showPatternCountAnimation') && (
    <Badge
      text={`(${vector.decision_patterns.length})`}
      variant="count"
      color="gray"
      className="ml-2"
    />
  )}
</h4>
```

---

## File 4: LoadingOverlay.tsx - Enhanced Final Loading

**What needs to be added:**

### A. Update interface
```typescript
interface LoadingOverlayProps {
  show: boolean;
  messages?: string[];
  finalMessage?: string;
  minDuration?: number;
}
```

### B. Add cycling message logic
```typescript
const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
const defaultMessages = [
  "Analyzing your 5 investment decisions...",
  "Comparing stated vs revealed preferences...",
  "Identifying your investor archetype...",
  "Calculating alignment scores...",
  "Generating personalized insights..."
];

useEffect(() => {
  if (!show || !messages) return;

  const interval = setInterval(() => {
    setCurrentMessageIndex(prev => (prev + 1) % messages.length);
  }, 800);

  return () => clearInterval(interval);
}, [show, messages]);
```

### C. Show enhanced loading
```typescript
{show && isFeatureEnabled('showEnhancedFinalLoading') && messages ? (
  <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="text-white text-lg mt-4 animate-fade-in">
        {messages[currentMessageIndex]}
      </p>
    </div>
  </div>
) : show ? (
  // Original simple overlay
) : null}
```

---

## File 5: Summary.tsx - Staggered Reveal

**What needs to be added:**

### A. Add stagger state
```typescript
const [showSections, setShowSections] = useState({
  archetype: false,
  patterns: false,
  comparison: false,
  breakdown: false,
  actions: false
});
```

### B. Trigger stagger on mount
```typescript
useEffect(() => {
  if (!isFeatureEnabled('showSummaryStaggeredReveal')) {
    setShowSections({
      archetype: true,
      patterns: true,
      comparison: true,
      breakdown: true,
      actions: true
    });
    return;
  }

  // Staggered reveal
  setTimeout(() => setShowSections(prev => ({ ...prev, archetype: true })), 200);
  setTimeout(() => setShowSections(prev => ({ ...prev, patterns: true })), 700);
  setTimeout(() => setShowSections(prev => ({ ...prev, comparison: true })), 1000);
  setTimeout(() => setShowSections(prev => ({ ...prev, breakdown: true })), 1300);
  setTimeout(() => setShowSections(prev => ({ ...prev, actions: true })), 1600);
}, []);
```

### C. Apply animations to sections
```typescript
{showSections.archetype && (
  <div className="animate-scale-in">
    <ArchetypeCard archetype={gameSummary.archetype} />
  </div>
)}

{showSections.patterns && (
  <div className="animate-slide-up">
    <DecisionPatterns patterns={gameSummary.decision_patterns} />
  </div>
)}
// etc...
```

### D. Add alignment badge animations
```typescript
{comparison.alignment === 'aligned' && isFeatureEnabled('showAlignmentBadgeAnimations') && (
  <span className="badge bg-semantic-successLight text-semantic-success animate-scale-bounce">
    ✓ Aligned
  </span>
)}

{comparison.alignment === 'misaligned' && isFeatureEnabled('showAlignmentBadgeAnimations') && (
  <span className="badge bg-semantic-errorLight text-semantic-error animate-shake">
    Misaligned
  </span>
)}
```

---

## Summary

**Files to Update**: 5
1. Game.tsx - ~100 lines to add
2. ScenarioView.tsx - ~30 lines to modify
3. InvestorVector.tsx - ~50 lines to add
4. LoadingOverlay.tsx - ~40 lines to modify
5. Summary.tsx - ~40 lines to modify

**Total Integration Effort**: ~260 lines of code spread across 5 files

**All components are ready** - just need to wire them into the existing flow.

Would you like me to proceed with these integrations, or would you prefer to review what's been done so far first and provide feedback before continuing?
