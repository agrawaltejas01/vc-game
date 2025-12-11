// API endpoint functions
import { InvestorProfile } from '../types/investor';
import { GameState } from '../types/game';
import {
  CreateProfileResponse,
  NextQuestionResponse,
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
 * Create investor profile and start game
 */
export async function createInvestorProfile(
  profile: InvestorProfile
): Promise<CreateProfileResponse> {
  if (apiClient.isUsingMock()) {
    // Mock implementation
    await delay(800);

    const gameId = generateId();
    mockStorage.profiles.set(gameId, profile);
    mockStorage.currentScenarioIndex.set(gameId, 0);
    mockStorage.responses.set(gameId, []);

    const initialScenario = mockScenarios[0];
    const investorVector = generateInvestorVector(0, profile);

    return {
      success: true,
      gameId,
      scenario: {
        ...initialScenario,
        investor_vector: investorVector,
      },
      currentQuestionIndex: 0,
      message: 'Game session created successfully',
    };
  }

  // Real API call
  const response = await apiClient.post<CreateProfileResponse>('/api/game/basic-details', {
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
    console.log("Mocking get scenario");
    // Mock implementation
    await delay(1000);

    const gameId = gameState.game_id;
    if (!gameId) {
      throw new Error('Game ID is required');
    }

    console.log(gameId)

    const profile = mockStorage.profiles.get(gameId);
    if (!profile) {
      throw new Error('Investor profile not found');
    }

    console.log(profile)

    const currentIndex = gameState.current_index;
    if (currentIndex >= mockScenarios.length) {
      throw new Error('No more scenarios available');
    }

    const scenario = mockScenarios[currentIndex];
    const investorVector = generateInvestorVector(currentIndex, profile);
    console.log("Generate investor vector");

    let data = {
      scenario: {
        ...scenario,
        investor_vector: investorVector,
      },
      investor_vector: investorVector,
      has_more: currentIndex < mockScenarios.length - 1,
    };

    console.log(data)

    return data

    
  }

  // Real API call
  const response = await apiClient.post<GetNextScenarioResponse>('/api/game/next-scenario', {
    game_id: gameState.game_id,
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
  decision: 'pass' | 'invest';
  audio_response?: Blob;
}): Promise<SubmitResponseResponse> {
  if (apiClient.isUsingMock()) {
    // Mock implementation
    await delay(1200);

    const { investor_id, scenario_id, decision, audio_response } = payload;

    const profile = mockStorage.profiles.get(investor_id);
    if (!profile) {
      throw new Error('Investor profile not found');
    }

    // Store response
    const responses = mockStorage.responses.get(investor_id) || [];
    responses.push({
      scenario_id,
      decision,
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
    formData.append('decision', payload.decision);
    formData.append('audio_response', payload.audio_response);
    body = formData;
    // Don't set Content-Type header - browser will set it with boundary for FormData
  } else {
    headers = { 'Content-Type': 'application/json' };
    body = JSON.stringify({
      investor_id: payload.investor_id,
      scenario_id: payload.scenario_id,
      decision: payload.decision,
    });
  }

  const response = await fetch(`${apiClient['baseUrl']}/api/game/next`, {
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
 * Submit answer and get next question (combined API call)
 */
export async function submitAndGetNext(payload: {
  gameId: string;
  currentQuestionIndex: number;
  investment_decision: 'not_investing' | 'investing';
  textResponse?: string;
  audioBlob?: Blob;
}): Promise<NextQuestionResponse> {
  if (apiClient.isUsingMock()) {
    await delay(1200);

    const profile = mockStorage.profiles.get(payload.gameId);
    if (!profile) {
      throw new Error('Game session not found');
    }

    // Log submission type
    console.log('Mock submission:', {
      investment_decision: payload.investment_decision,
      hasText: !!payload.textResponse,
      hasAudio: !!payload.audioBlob,
      textLength: payload.textResponse?.length || 0,
    });

    // Update scenario index
    const currentIndex = mockStorage.currentScenarioIndex.get(payload.gameId) || 0;
    const nextIndex = currentIndex + 1;
    mockStorage.currentScenarioIndex.set(payload.gameId, nextIndex);

    // Check if game completed (6 total scenarios)
    if (nextIndex >= mockScenarios.length) {
      return {
        success: true,
        currentQuestionIndex: nextIndex,
        gameCompleted: true,
        message: 'Game completed',
      };
    }

    // Return next scenario
    const nextScenario = mockScenarios[nextIndex];
    const investorVector = generateInvestorVector(nextIndex, profile);

    return {
      success: true,
      scenario: {
        ...nextScenario,
        investor_vector: investorVector,
      },
      currentQuestionIndex: nextIndex,
      gameCompleted: false,
    };
  }

  // Real API call using FormData
  const formData = new FormData();
  formData.append('gameId', payload.gameId);
  formData.append('currentQuestionIndex', payload.currentQuestionIndex.toString());
  formData.append('investment_decision', payload.investment_decision);

  // Conditionally add text response
  if (payload.textResponse) {
    formData.append('textResponse', payload.textResponse);
  }

  // Conditionally add audio
  if (payload.audioBlob) {
    formData.append('audio', payload.audioBlob, 'response.webm');
  }

  const baseUrl = apiClient['baseUrl'] || 'http://13.200.21.218:3000';
  const response = await fetch(`${baseUrl}/api/game/next-question`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to submit answer and get next question');
  }

  return response.json();
}

/**
 * Get game summary
 */
export async function getGameSummary(gameId: string): Promise<GetSummaryResponse> {
  if (apiClient.isUsingMock()) {
    // Mock implementation
    await delay(1500);

    const profile = mockStorage.profiles.get(gameId);
    if (!profile) {
      throw new Error('Game session not found');
    }

    const summary = generateGameSummary(profile);

    // Match backend response structure
    return {
      success: true,
      summary,
      message: 'Game summary generated successfully',
    };
  }

  // Real API call - POST request with JSON body
  const response = await apiClient.post<GetSummaryResponse>(
    '/api/game/summary',
    { gameId }
  );

  if (!response.success || !response.data) {
    throw new Error(response.error?.message || 'Failed to fetch game summary');
  }

  return response.data;
}
