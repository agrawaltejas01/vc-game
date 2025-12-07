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

  const weightKeys = Object.keys(weights) as Array<keyof EvaluationWeights>;

  const handleChange = (key: keyof EvaluationWeights, value: number) => {
    const newWeights = { ...weights, [key]: value };
    const newSum = getWeightagesSum(newWeights);
    const difference = newSum - 100;

    // If the sum is not 100, auto-adjust another slider
    if (difference !== 0) {
      const currentIndex = weightKeys.indexOf(key);
      const lastIndex = weightKeys.length - 1;

      // If changing the last slider, adjust the second-last
      // Otherwise, adjust the last slider
      const adjustKey =
        currentIndex === lastIndex
          ? weightKeys[lastIndex - 1]
          : weightKeys[lastIndex];

      // Adjust the target slider, ensuring it doesn't go below 0
      const adjustedValue = Math.max(0, newWeights[adjustKey] - difference);
      newWeights[adjustKey] = adjustedValue;

      // If adjustment would make it negative, redistribute the overflow
      if (newWeights[adjustKey] === 0 && difference > 0) {
        // Find another slider to adjust (go backwards from last)
        for (let i = lastIndex; i >= 0; i--) {
          const candidateKey = weightKeys[i];
          if (candidateKey !== key && candidateKey !== adjustKey) {
            const remainingDiff = newSum - getWeightagesSum(newWeights);
            newWeights[candidateKey] = Math.max(
              0,
              newWeights[candidateKey] - remainingDiff
            );
            break;
          }
        }
      }
    }

    onChange(newWeights);
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
