// Game state and response types

export interface GameState {
  investor_id?: string;
  current_index: number;
  max_scenarios: number;
  is_completed: boolean;
}

export interface ScenarioResponse {
  scenario_id: string;
  text_response?: string;
  audio_response?: Blob;
}

export interface DecisionPattern {
  pattern: string;
  examples: string[];
  confidence: 'high' | 'medium' | 'low';
}

export interface ArchetypeComparison {
  stated_preference: string;
  revealed_preference: string;
  alignment: 'aligned' | 'partially_aligned' | 'misaligned';
  insights: string;
}

export interface GameSummary {
  archetype_name: string;
  archetype_description: string;
  decision_patterns: DecisionPattern[];
  comparison_to_initial: ArchetypeComparison[];
  evaluation_breakdown: {
    founders: number;
    sector_market: number;
    traction: number;
    product_tech: number;
    round_dynamics: number;
  };
  additional_insights?: Record<string, any>;
}
