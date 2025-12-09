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
  success: boolean;
  gameId: string;
  scenario: Scenario;
  currentQuestionIndex: number;
  message: string;
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

// Next Question API (combines submission + get next)
export interface NextQuestionRequest {
  gameId: string;
  currentQuestionIndex: number;
  audioBlob: Blob;
}

export interface NextQuestionResponse {
  success: boolean;
  scenario?: Scenario;
  currentQuestionIndex: number;
  gameCompleted?: boolean;
  message?: string;
}

// Summary API
export interface GetSummaryRequest {
  game_id: string;
}

export interface GetSummaryResponse {
  summary: GameSummary;
}
