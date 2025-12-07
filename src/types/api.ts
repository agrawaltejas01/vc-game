// API request and response types

import { InvestorProfile } from './investor';
import { Scenario, InvestorVector } from './scenario';
import { GameSummary, ScenarioResponse } from './game';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Investor Profile API
export interface CreateProfileRequest {
  profile: InvestorProfile;
}

export interface CreateProfileResponse {
  investor_id: string;
  profile: InvestorProfile;
}

// Scenario API
export interface GetNextScenarioRequest {
  investor_id: string;
  current_index?: number;
}

export interface GetNextScenarioResponse {
  scenario: Scenario;
  investor_vector: InvestorVector;
  has_more: boolean;
}

// Response Submission API
export interface SubmitResponseRequest extends ScenarioResponse {
  investor_id: string;
}

export interface SubmitResponseResponse {
  has_more: boolean;
  updated_vector: InvestorVector;
  next_scenario_id?: string;
}

// Summary API
export interface GetSummaryRequest {
  investor_id: string;
}

export interface GetSummaryResponse {
  summary: GameSummary;
}
