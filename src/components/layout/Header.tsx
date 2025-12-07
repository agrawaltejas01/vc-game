import { useGameContext } from '../../context/GameContext';

export function Header() {
  const { gameState } = useGameContext();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary-600">VC Deal Judgment</h1>
          </div>

          {gameState.investor_id && !gameState.is_completed && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Scenario {gameState.current_index + 1} of {gameState.max_scenarios}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
