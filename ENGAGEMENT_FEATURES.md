# Engagement Features - Implementation Tracking

This document tracks all 16 engagement nudge features. Each can be independently enabled/disabled in `/src/config/engagementFeatures.ts`.

---

## Feature List

### ✅ **Feature 1: First Decision Toast Notification**
- **Flag**: `showFirstDecisionToast`
- **Trigger**: After first scenario submission
- **Component**: Toast notification (top-right desktop, top-center mobile)
- **Message**: "✨ Your Decision Vector is Live!"
- **Action**: Points to decision vector panel / switches to vector tab on mobile
- **Status**: ✅ Components created, needs integration in Game.tsx

### ✅ **Feature 2: Decision Vector Panel Highlight**
- **Flag**: `showVectorPanelHighlight`
- **Trigger**: Simultaneous with first decision toast
- **Effect**: Pulsing purple border on vector panel (3 pulses over 2 seconds)
- **CSS**: `animate-pulse-border` class
- **Status**: ✅ Animation ready, needs integration in Game.tsx

### ⏳ **Feature 3: Success Animation on Submission**
- **Flag**: `showSuccessAnimation`
- **Trigger**: After any scenario submission (button click → API success)
- **Effect**: Submit button morphs to checkmark with ripple effect
- **Duration**: 1.5 seconds
- **Status**: ⏳ Needs implementation in ScenarioView.tsx

### ⏳ **Feature 4: Metric Change Indicators**
- **Flag**: `showMetricChangeIndicators`
- **Trigger**: When quantitative metrics update after submission
- **Effect**: Up/down arrows next to changed metrics
- **Display**: "Founders: 45% ↑" (purple up) or "Traction: 18% ↓" (gray down)
- **Duration**: Fades out after 3 seconds
- **Status**: ⏳ Needs implementation in InvestorVector.tsx

### ⏳ **Feature 5: New Insight Badges**
- **Flag**: `showNewInsightBadges`
- **Trigger**: When new qualitative insights appear
- **Effect**: "NEW" badge on insight card, slide-in animation for new items
- **Component**: Badge component with `variant="new"`
- **Status**: ✅ Badge component created, needs integration in InvestorVector.tsx

### ⏳ **Feature 6: Midpoint Celebration Modal**
- **Flag**: `showMidpointCelebration`
- **Trigger**: After scenario 3 submission, before scenario 4 loads
- **Component**: CelebrationModal
- **Title**: "🎯 Halfway There!"
- **Stats**: Optional quick stats (invest/pass ratio, metric changes)
- **Actions**: "Continue Investing" (primary), "View Vector" (secondary, mobile only)
- **Status**: ✅ Component created, needs integration in Game.tsx

### ✅ **Feature 7: Enhanced Progress Bar with Milestones**
- **Flag**: `showEnhancedProgressBar`
- **Trigger**: Always visible (replaces simple progress bar)
- **Display**: Circle nodes for each scenario, filled/pulsing/empty states
- **Text**: "Scenario X of 5 • Your profile is Y% revealed"
- **Status**: ✅ Implemented in ProgressBar.tsx

### ⏳ **Feature 8: Mobile Progress Reminder**
- **Flag**: `showMobileProgressReminder`
- **Trigger**: Sticky bottom bar on mobile when on Scenario tab
- **Display**: "Scenario 3 of 5 | [View Vector →]"
- **Purpose**: Remind users to check vector tab
- **Status**: ⏳ Needs implementation in Game.tsx (mobile only)

### ⏳ **Feature 9: Pre-Final Alert**
- **Flag**: `showPreFinalAlert`
- **Trigger**: After scenario 4 submission, before scenario 5 loads
- **Type**: Inline banner (slide down from top)
- **Message**: "⚡ Final Scenario Coming Up! One more decision and you'll unlock your complete Investor Archetype Profile."
- **Color**: Gold accent (`card-accent-gold`)
- **Dismissible**: Yes (X button)
- **Status**: ⏳ Needs implementation in Game.tsx

### ⏳ **Feature 10: Enhanced Final Loading Screen**
- **Flag**: `showEnhancedFinalLoading`
- **Trigger**: After scenario 5 submission
- **Effect**: Full-screen loading with cycling messages
- **Messages**:
  - "Analyzing your 5 investment decisions..."
  - "Comparing stated vs revealed preferences..."
  - "Identifying your investor archetype..."
  - "Calculating alignment scores..."
  - "Generating personalized insights..."
  - "✓ Profile Complete!"
- **Duration**: 3-5 seconds minimum (dramatic pause)
- **Status**: ⏳ Needs implementation in LoadingOverlay.tsx

### ⏳ **Feature 11: Confetti Animation**
- **Flag**: `showConfetti`
- **Trigger**: When "Profile Complete!" message shows
- **Effect**: Brief confetti burst from top
- **Colors**: Purple, cyan, gold (brand colors)
- **Duration**: 1.5 seconds
- **Status**: ⏳ Needs CSS-only confetti implementation

### ⏳ **Feature 12: Metric Comparison Tooltips**
- **Flag**: `showMetricTooltips`
- **Trigger**: Hover over metric bars (desktop only)
- **Content**: Shows stated vs revealed comparison
  ```
  Founders: 45%
  ─────────────────
  Stated: 30%
  Revealed: 45%
  Difference: +15%
  ```
- **Status**: ⏳ Needs implementation in InvestorVector.tsx

### ⏳ **Feature 13: Pattern Count Animation**
- **Flag**: `showPatternCountAnimation`
- **Trigger**: When decision patterns list grows
- **Effect**: Number badge next to "Decision Patterns" heading
- **Animation**: Number flips with scale (odometer style)
- **Display**: "(3 patterns)" → "(4 patterns)"
- **Status**: ⏳ Needs implementation in InvestorVector.tsx

### ⏳ **Feature 14: Summary Staggered Reveal**
- **Flag**: `showSummaryStaggeredReveal`
- **Trigger**: Summary page load
- **Effect**: Sections appear one by one with delays
- **Sequence**:
  1. Archetype Card (scale-in from center) - 400ms
  2. Pause 300ms
  3. Decision Patterns (slide-up) - 300ms
  4. Pause 200ms
  5. Stated vs Revealed (slide-up) - 300ms
  6. Pause 200ms
  7. Evaluation Breakdown (slide-up) - 300ms
  8. Action buttons (fade-in) - 200ms
- **Total**: ~2.5 seconds
- **Status**: ⏳ Needs implementation in Summary.tsx

### ⏳ **Feature 15: Alignment Badge Animations**
- **Flag**: `showAlignmentBadgeAnimations`
- **Trigger**: When Stated vs Revealed cards appear
- **Effect**:
  - "aligned" badges: Quick green checkmark animation
  - "misaligned" badges: Shake animation
- **Timing**: Badges pop in 200ms after card slides up
- **Status**: ⏳ Needs implementation in Summary.tsx

### ✅ **Feature 16: Mobile Vector Tab Notification Dot**
- **Flag**: `showMobileVectorNotificationDot`
- **Trigger**: After each scenario submission on mobile (when on Scenario tab)
- **Platform**: Mobile only (< 1024px)
- **Effect**: Small pulsing purple dot on "Your Decision Vector" tab
- **Duration**: 5 seconds or until user clicks tab
- **Animation**: Pulse with expanding ring effect (1.5s cycle, infinite)
- **Auto-dismiss**: Clicking tab OR 5-second timeout
- **Status**: ✅ Implemented

---

## Implementation Status Summary

| Status | Count | Features |
|--------|-------|----------|
| ✅ Complete | 5 | 1, 2, 5, 6, 7 |
| ⏳ In Progress | 10 | 3, 4, 8, 9, 10, 11, 12, 13, 14, 15 |

---

## Files Modified

### Created Files
- ✅ `/src/config/engagementFeatures.ts` - Feature flags
- ✅ `/src/components/common/Toast.tsx` - Toast notification component
- ✅ `/src/components/common/Badge.tsx` - Badge component
- ✅ `/src/components/game/CelebrationModal.tsx` - Midpoint modal
- ✅ `/src/hooks/useToast.ts` - Toast state management
- ✅ `/src/index.css` - All CSS animations added

### Updated Files
- ✅ `/src/components/game/ProgressBar.tsx` - Enhanced with milestones
- ✅ `/src/context/GameContext.tsx` - Added engagement tracking state
- ⏳ `/src/routes/Game.tsx` - Add nudge triggers (Features 1, 2, 6, 8, 9)
- ⏳ `/src/components/game/ScenarioView.tsx` - Success animation (Feature 3)
- ⏳ `/src/components/game/InvestorVector.tsx` - Change indicators, badges, tooltips, patterns (Features 4, 5, 12, 13)
- ⏳ `/src/components/common/LoadingOverlay.tsx` - Enhanced loading (Features 10, 11)
- ⏳ `/src/routes/Summary.tsx` - Staggered reveal, badge animations (Features 14, 15)

---

## Quick Disable Guide

To disable specific features, edit `/src/config/engagementFeatures.ts`:

```typescript
export const engagementConfig: EngagementFeatures = {
  showFirstDecisionToast: false,        // Disable Feature 1
  showVectorPanelHighlight: false,      // Disable Feature 2
  showSuccessAnimation: false,          // Disable Feature 3
  // ... etc
};
```

Or disable ALL features at once:

```typescript
export const engagementConfig: EngagementFeatures = {
  ...Object.keys(engagementConfig).reduce((acc, key) => ({
    ...acc,
    [key]: false
  }), {} as EngagementFeatures)
};
```
