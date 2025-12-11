import { useGameContext } from '../../context/GameContext';

export function Header() {
  const { gameState } = useGameContext();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              src="/assets/dealwars-logo.png"
              alt="DealWars"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </div>

          {gameState.game_id && !gameState.is_completed && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 font-medium">
                Scenario {gameState.current_index + 1} of {gameState.max_scenarios}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
