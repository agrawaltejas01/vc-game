// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

// Custom event tracking functions
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Page view tracking (for manual tracking if needed)
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-TKWBHMW7VE', {
      page_path: url,
      page_title: title,
    });
  }
};

// Game-specific events
export const trackGameEvent = {
  startGame: () => trackEvent('game_start'),
  submitDecision: (decision: 'pass' | 'invest', scenarioIndex: number) =>
    trackEvent('submit_decision', { decision, scenario_index: scenarioIndex }),
  completeGame: (totalScenarios: number) =>
    trackEvent('game_complete', { total_scenarios: totalScenarios }),
  viewSummary: () => trackEvent('view_summary'),
};

// Investor profile events
export const trackProfileEvent = {
  completeIntake: (profile: {
    stageFocus: string[];
    sectors: string[];
    geography: string[];
  }) =>
    trackEvent('complete_intake', {
      stage_focus: profile.stageFocus.join(','),
      sectors: profile.sectors.join(','),
      geography: profile.geography.join(','),
    }),
};
