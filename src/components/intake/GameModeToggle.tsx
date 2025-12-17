import { GameMode } from '../../types/investor';

interface GameModeToggleProps {
  selected: GameMode;
  onChange: (mode: GameMode) => void;
}

const modeLabels: Record<GameMode, string> = {
  quick: 'Quick',
  detailed: 'Detailed',
};

export function GameModeToggle({ selected, onChange }: GameModeToggleProps) {
  const modes: GameMode[] = ['quick', 'detailed'];

  return (
    <div>
      <label className="label">
        Game Mode <span className="text-semantic-error font-bold">*</span>
      </label>
      <p className="text-sm text-gray-600 mb-3">
        Choose between Quick (~3 min) or Detailed (~8 min)
      </p>
      <div className="flex gap-2">
        {modes.map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => onChange(mode)}
            className={`
              inline-flex items-center px-6 py-2 rounded-full border-2 font-medium cursor-pointer transition-all
              ${
                selected === mode
                  ? 'border-primary-500 bg-primary-50 text-primary-900 font-semibold'
                  : 'border-gray-300 bg-white text-black hover:border-black'
              }
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
            `}
          >
            {modeLabels[mode]}
          </button>
        ))}
      </div>
    </div>
  );
}
