// Investor-related types for the intake form

export enum Stage {
  PRE_SEED = 'pre-seed',
  SEED = 'seed',
  SERIES_A = 'series_a',
  SERIES_B = 'series_b',
  LATE_STAGE = 'late_stage',
}

export enum Geography {
  INDIA = 'India',
  MENA = 'MENA',
  LATAM = 'LATAM',
  US = 'US',
  EUROPE = 'Europe',
}

export type GameMode = 'quick' | 'detailed';

export interface EvaluationWeights {
  founders: number;
  sector_market: number;
  traction: number;
  product_tech: number;
  round_dynamics: number;
}

export interface InvestorProfile {
  preferred_sectors: string[];
  avoided_sectors: string[];
  stage_focus: Stage[];
  geography_focus: string[];
  evaluation_weights: EvaluationWeights;
  cheque_size_min: string;
  cheque_size_max: string;
  game_mode: GameMode;
}
