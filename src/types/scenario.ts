// Scenario-related types

export interface Business {
  company_name: string;
  one_liner: string;
  description: string;
  business_model: string;
  is_pre_product: boolean;
  is_pre_revenue: boolean;
}

export interface FounderProfile {
  summary: string;
  team_bullets: string[];
}

export interface RoundDetails {
  round_type: string;
  total_round_size_usd: number;
  valuation?: number;
  valuation_pre_money_usd?: number;
  investor_ask_usd: number;
  lead_status: 'leading' | 'following' | 'no_lead_yet';
  other_investors?: string[];
}

export interface TractionSnapshot {
  revenue_arr_mrr?: string;
  growth_rate?: string;
  key_metrics: Record<string, string | number>;
  customer_count?: number;
}

export interface Tension {
  description: string;
  key_risks: string[];
}

export interface InvestorVector {
  quantitative_metrics: {
    founders: number;
    sector_market: number;
    traction: number;
    product_tech: number;
    round_dynamics: number;
  };
  qualitative_insights: string[];
  decision_patterns: string[];
  risk_tolerance?: string;
  other_metadata?: Record<string, any>;
}

export interface Scenario {
  scenario_id: string;
  scenario_index: number;
  stage: string;
  sector: string;
  business: Business;
  founder_profile: FounderProfile;
  round_details: RoundDetails;
  traction_snapshot: TractionSnapshot | null;
  tension: Tension;
  info_gaps: string[];
  question_to_investor: string;
  has_twist: boolean;
  investor_vector?: InvestorVector;
}
