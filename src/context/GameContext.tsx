// Global game state management using React Context
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { InvestorProfile } from '../types/investor';
import { Scenario, InvestorVector } from '../types/scenario';
import { GameState, GameSummary } from '../types/game';

interface GameContextType {
  // State
  investorProfile: InvestorProfile | null;
  gameId: string | null;
  gameState: GameState;
  currentScenario: Scenario | null;
  investorVector: InvestorVector | null;
  gameSummary: GameSummary | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setInvestorProfile: (profile: InvestorProfile, id: string) => void;
  setCurrentScenario: (scenario: Scenario) => void;
  setInvestorVector: (vector: InvestorVector) => void;
  setGameSummary: (summary: GameSummary) => void;
  incrementScenarioIndex: () => void;
  completeGame: () => void;
  resetGame: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [investorProfile, setInvestorProfileState] = useState<InvestorProfile | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    current_index: 0,
    max_scenarios: 6,
    is_completed: false,
  });
  const [currentScenario, setCurrentScenarioState] = useState<Scenario | null>(null);
  const [investorVector, setInvestorVectorState] = useState<InvestorVector | null>(null);
  const [gameSummary, setGameSummaryState] = useState<GameSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setInvestorProfile = useCallback((profile: InvestorProfile, id: string) => {
    setInvestorProfileState(profile);
    setGameId(id);
    setGameState(prev => ({ ...prev, game_id: id }));
  }, []);

  const setCurrentScenario = useCallback((scenario: Scenario) => {
    setCurrentScenarioState(scenario);
    if (scenario.investor_vector) {
      setInvestorVectorState(scenario.investor_vector);
    }
  }, []);

  const setInvestorVector = useCallback((vector: InvestorVector) => {
    setInvestorVectorState(vector);
  }, []);

  const setGameSummary = useCallback((summary: GameSummary) => {
    setGameSummaryState(summary);
  }, []);

  const incrementScenarioIndex = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      current_index: prev.current_index + 1,
    }));
  }, []);

  const completeGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      is_completed: true,
    }));
  }, []);

  const resetGame = useCallback(() => {
    setInvestorProfileState(null);
    setGameId(null);
    setGameState({
      current_index: 0,
      max_scenarios: 6,
      is_completed: false,
    });
    setCurrentScenarioState(null);
    setInvestorVectorState(null);
    setGameSummaryState(null);
    setError(null);
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const setErrorCallback = useCallback((err: string | null) => {
    setError(err);
  }, []);

  const value: GameContextType = {
    investorProfile,
    gameId,
    gameState,
    currentScenario,
    investorVector,
    gameSummary,
    isLoading,
    error,
    setInvestorProfile,
    setCurrentScenario,
    setInvestorVector,
    setGameSummary,
    incrementScenarioIndex,
    completeGame,
    resetGame,
    setLoading,
    setError: setErrorCallback,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}
