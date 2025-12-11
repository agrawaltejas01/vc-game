/**
 * Feature flags for engagement nudges
 * Toggle these to enable/disable specific engagement features
 */

export interface EngagementFeatures {
  // Feature 1: First decision toast notification
  showFirstDecisionToast: boolean;

  // Feature 2: Decision vector panel highlight (pulsing border)
  showVectorPanelHighlight: boolean;

  // Feature 3: Success animation on decision submission
  showSuccessAnimation: boolean;

  // Feature 4: Metric change indicators (up/down arrows)
  showMetricChangeIndicators: boolean;

  // Feature 5: New insight badges and animations
  showNewInsightBadges: boolean;

  // Feature 6: Midpoint celebration modal (after scenario 3)
  showMidpointCelebration: boolean;

  // Feature 7: Enhanced progress bar with milestones
  showEnhancedProgressBar: boolean;

  // Feature 8: Sticky progress reminder on mobile
  showMobileProgressReminder: boolean;

  // Feature 9: Pre-final scenario alert (after scenario 4)
  showPreFinalAlert: boolean;

  // Feature 10: Enhanced final loading screen
  showEnhancedFinalLoading: boolean;

  // Feature 11: Confetti animation on completion
  showConfetti: boolean;

  // Feature 12: Metric comparison tooltips
  showMetricTooltips: boolean;

  // Feature 13: Pattern count animations
  showPatternCountAnimation: boolean;

  // Feature 14: Summary staggered reveal
  showSummaryStaggeredReveal: boolean;

  // Feature 15: Alignment badge animations
  showAlignmentBadgeAnimations: boolean;

  // Feature 16: Mobile vector tab notification dot
  showMobileVectorNotificationDot: boolean;
}

// Default configuration - ALL ENABLED for initial testing
export const engagementConfig: EngagementFeatures = {
  showFirstDecisionToast: false,
  showVectorPanelHighlight: false,
  showSuccessAnimation: false,
  showMetricChangeIndicators: false,
  showNewInsightBadges: false,
  showMidpointCelebration: false,
  showEnhancedProgressBar: false,
  showMobileProgressReminder: false,
  showPreFinalAlert: false,
  showEnhancedFinalLoading: false,
  showConfetti: true,
  showMetricTooltips: false,
  showPatternCountAnimation: false,
  showSummaryStaggeredReveal: false,
  showAlignmentBadgeAnimations: false,
  showMobileVectorNotificationDot: true, // Feature 16 - enabled by default
};

/**
 * Get engagement feature configuration
 */
export function getEngagementConfig(): EngagementFeatures {
  return engagementConfig;
}

/**
 * Check if a specific feature is enabled
 */
export function isFeatureEnabled(feature: keyof EngagementFeatures): boolean {
  return engagementConfig[feature];
}
