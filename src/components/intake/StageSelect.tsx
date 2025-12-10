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
    <div className="flex flex-wrap gap-2">
      {Object.values(Stage).map((stage) => (
        <button
          key={stage}
          type="button"
          onClick={() => toggleStage(stage)}
          className={`
            inline-flex items-center px-4 py-2 rounded-full border-2 font-medium cursor-pointer transition-all
            ${
              selected.includes(stage)
                ? 'border-primary-500 bg-primary-50 text-primary-900 font-semibold'
                : 'border-gray-300 bg-white text-black hover:border-black'
            }
            focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
          `}
        >
          {stageLabels[stage]}
        </button>
      ))}
    </div>
  );
}
