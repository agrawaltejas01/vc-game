import { EvaluationWeights } from '../../types/investor';
import { getWeightagesSum } from '../../utils/validation';

interface WeightageSlidersProps {
  weights: EvaluationWeights;
  onChange: (weights: EvaluationWeights) => void;
}

const weightLabels: Record<keyof EvaluationWeights, string> = {
  founders: 'Founders / Team',
  sector_market: 'Sector / Market',
  traction: 'Traction / Metrics',
  product_tech: 'Product / Technology',
  round_dynamics: 'Round Dynamics (valuation, lead, etc.)',
};

export function WeightageSliders({ weights, onChange }: WeightageSlidersProps) {
  const sum = getWeightagesSum(weights);
  const isValid = sum === 100;

  const handleChange = (key: keyof EvaluationWeights, value: number) => {
    onChange({
      ...weights,
      [key]: value,
    });
  };

  return (
    <div className="space-y-6">
      {(Object.keys(weights) as Array<keyof EvaluationWeights>).map((key) => (
        <div key={key}>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              {weightLabels[key]}
            </label>
            <span className="text-sm font-semibold text-gray-900">
              {weights[key]}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={weights[key]}
            onChange={(e) => handleChange(key, parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
        </div>
      ))}

      <div
        className={`
          mt-4 p-4 rounded-lg border-2 text-center font-semibold
          ${
            isValid
              ? 'bg-green-50 border-green-500 text-green-700'
              : 'bg-yellow-50 border-yellow-500 text-yellow-700'
          }
        `}
      >
        Total: {sum}% {isValid ? '✓' : `(must equal 100%)`}
      </div>
    </div>
  );
}
