// Investor-related types for the intake form

export enum Sector {
  SAAS = 'SaaS',
  AI_INFRA = 'AI Infra / DevTools',
  FINTECH_INFRA = 'Fintech Infra (non-regulated)',
  CONSUMER_INTERNET = 'Consumer Internet Infra',
  SUPPLY_CHAIN = 'Supply Chain / Manufacturing Tech',
  HEALTH_INFRA = 'Health Infra',
  MOBILITY_LOGISTICS = 'Mobility / Logistics',
  CLIMATE_ENERGY = 'Climate / Energy-lite',
  DEEPTECH = 'Deeptech',
  EDTECH_INFRA = 'Edtech Infra',
  OTHER = 'Other',
  CRYPTO = 'Crypto',
  GAMBLING = 'Gambling',
  DEFENCE = 'Defence',
}

export enum Stage {
  PRE_SEED = 'pre-seed',
  SEED = 'seed',
  SERIES_A = 'series_a',
  SERIES_B_PLUS = 'series_b_plus',
}

export enum Geography {
  US_CANADA = 'US/Canada',
  EUROPE = 'Europe',
  INDIA = 'India',
  SOUTHEAST_ASIA = 'Southeast Asia',
  GLOBAL = 'Global',
  OTHER = 'Other',
}

export interface EvaluationWeights {
  founders: number;
  sector_market: number;
  traction: number;
  product_tech: number;
  round_dynamics: number;
}

export interface InvestorProfile {
  preferred_sectors: Sector[];
  avoided_sectors: Sector[];
  avoided_sectors_other?: string;
  stage_focus: Stage[];
  geography_focus: Geography[];
  evaluation_weights: EvaluationWeights;
}
