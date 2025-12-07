// API endpoint functions
import { InvestorProfile } from '../types/investor';
import { GameState } from '../types/game';
import {
  CreateProfileResponse,
  GetNextScenarioResponse,
  SubmitResponseResponse,
  GetSummaryResponse,
} from '../types/api';
import { apiClient } from './client';
import {
  delay,
  mockScenarios,
  generateInvestorVector,
  generateGameSummary,
} from './mock';

// In-memory storage for mock mode
let mockStorage: {
  profiles: Map<string, InvestorProfile>;
  currentScenarioIndex: Map<string, number>;
  responses: Map<string, any[]>;
} = {
  profiles: new Map(),
  currentScenarioIndex: new Map(),
  responses: new Map(),
};

// Generate unique ID
const generateId = () => `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

/**
 * Create or update investor profile
 */
export async function createInvestorProfile(
  profile: InvestorProfile
): Promise<CreateProfileResponse> {
  if (apiClient.isUsingMock()) {
    // Mock implementation
    await delay(800);

    const investorId = generateId();
    mockStorage.profiles.set(investorId, profile);
    mockStorage.currentScenarioIndex.set(investorId, 0);
    mockStorage.responses.set(investorId, []);

    return {
      investor_id: investorId,
      profile,
    };
  }

  // Real API call
  const response = await apiClient.post<CreateProfileResponse>('/investor-profile', {
    profile,
  });

  if (!response.success || !response.data) {
    throw new Error(response.error?.message || 'Failed to create investor profile');
  }

  return response.data;
}

/**
 * Get next scenario
 */
export async function getNextScenario(
  gameState: GameState
): Promise<GetNextScenarioResponse> {
  if (apiClient.isUsingMock()) {
    // Mock implementation
    await delay(1000);

    const investorId = gameState.investor_id;
    if (!investorId) {
      throw new Error('Investor ID is required');
    }

    const profile = mockStorage.profiles.get(investorId);
    if (!profile) {
      throw new Error('Investor profile not found');
    }

    const currentIndex = gameState.current_index;
    if (currentIndex >= mockScenarios.length) {
      throw new Error('No more scenarios available');
    }

    const scenario = mockScenarios[currentIndex];
    const investorVector = generateInvestorVector(currentIndex, profile);

    return {
      scenario: {
        ...scenario,
        investor_vector: investorVector,
      },
      investor_vector: investorVector,
      has_more: currentIndex < mockScenarios.length - 1,
    };
  }

  // Real API call
  const response = await apiClient.post<GetNextScenarioResponse>('/game/next-scenario', {
    investor_id: gameState.investor_id,
    current_index: gameState.current_index,
  });

  if (!response.success || !response.data) {
    throw new Error(response.error?.message || 'Failed to fetch next scenario');
  }

  return response.data;
}

/**
 * Submit scenario response
 */
export async function submitScenarioResponse(payload: {
  investor_id: string;
  scenario_id: string;
  text_response?: string;
  audio_response?: Blob;
}): Promise<SubmitResponseResponse> {
  if (apiClient.isUsingMock()) {
    // Mock implementation
    await delay(1200);

    const { investor_id, scenario_id, text_response, audio_response } = payload;

    const profile = mockStorage.profiles.get(investor_id);
    if (!profile) {
      throw new Error('Investor profile not found');
    }

    // Store response
    const responses = mockStorage.responses.get(investor_id) || [];
    responses.push({
      scenario_id,
      text_response,
      has_audio: !!audio_response,
      timestamp: new Date().toISOString(),
    });
    mockStorage.responses.set(investor_id, responses);

    // Update scenario index
    const currentIndex = mockStorage.currentScenarioIndex.get(investor_id) || 0;
    const nextIndex = currentIndex + 1;
    mockStorage.currentScenarioIndex.set(investor_id, nextIndex);

    // Generate updated vector
    const updatedVector = generateInvestorVector(nextIndex, profile);

    return {
      has_more: nextIndex < mockScenarios.length,
      updated_vector: updatedVector,
      next_scenario_id: nextIndex < mockScenarios.length
        ? mockScenarios[nextIndex].scenario_id
        : undefined,
    };
  }

  // Real API call - handle FormData for audio
  let body;
  let headers: HeadersInit = {};

  if (payload.audio_response) {
    const formData = new FormData();
    formData.append('investor_id', payload.investor_id);
    formData.append('scenario_id', payload.scenario_id);
    if (payload.text_response) {
      formData.append('text_response', payload.text_response);
    }
    formData.append('audio_response', payload.audio_response);
    body = formData;
    // Don't set Content-Type header - browser will set it with boundary for FormData
  } else {
    headers = { 'Content-Type': 'application/json' };
    body = JSON.stringify({
      investor_id: payload.investor_id,
      scenario_id: payload.scenario_id,
      text_response: payload.text_response,
    });
  }

  const response = await fetch(`${apiClient['baseUrl']}/game/scenario-response`, {
    method: 'POST',
    headers,
    body,
  });

  if (!response.ok) {
    throw new Error('Failed to submit response');
  }

  const data = await response.json();
  return data;
}

/**
 * Get game summary
 */
export async function getGameSummary(investorId: string): Promise<GetSummaryResponse> {
  if (apiClient.isUsingMock()) {
    // Mock implementation
    await delay(1500);

    const profile = mockStorage.profiles.get(investorId);
    if (!profile) {
      throw new Error('Investor profile not found');
    }

    const summary = generateGameSummary(profile);

    return {
      summary,
    };
  }

  // Real API call
  const response = await apiClient.get<GetSummaryResponse>(
    `/game/summary?investor_id=${investorId}`
  );

  if (!response.success || !response.data) {
    throw new Error(response.error?.message || 'Failed to fetch game summary');
  }

  return response.data;
}
