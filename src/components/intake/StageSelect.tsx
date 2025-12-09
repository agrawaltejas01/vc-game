import { Stage } from '../../types/investor';

interface StageSelectProps {
  selected: Stage[];
  onChange: (stages: Stage[]) => void;
}

const stageLabels: Record<Stage, string> = {
  [Stage.PRE_SEED]: 'Pre-seed',
  [Stage.SEED]: 'Seed',
  [Stage.SERIES_A]: 'Series A',
  [Stage.SERIES_B]: 'Series B',
  [Stage.LATE_STAGE]: 'Late Stage',
};

export function StageSelect({ selected, onChange }: StageSelectProps) {
  const toggleStage = (stage: Stage) => {
    if (selected.includes(stage)) {
      onChange(selected.filter((s) => s !== stage));
    } else {
      onChange([...selected, stage]);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {Object.values(Stage).map((stage) => (
        <label
          key={stage}
          className={`
            flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all
            ${
              selected.includes(stage)
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }
          `}
        >
          <input
            type="checkbox"
            checked={selected.includes(stage)}
            onChange={() => toggleStage(stage)}
            className="sr-only"
          />
          <span className="text-sm font-medium text-gray-700">
            {stageLabels[stage]}
          </span>
        </label>
      ))}
    </div>
  );
}
