import { useState } from 'react';
import { InvestorProfile, Stage, Geography, EvaluationWeights } from '../../types/investor';
import { validateWeightagesSum, getWeightagesSum } from '../../utils/validation';
import { StageSelect } from './StageSelect';
import { WeightageSliders } from './WeightageSliders';

interface InvestorIntakeFormProps {
  onSubmit: (profile: InvestorProfile) => void;
}

const COMMON_SECTORS = ['fintech', 'ai', 'healthtech', 'consumer', 'saas', 'enterprise', 'deeptech', 'edtech', 'defence', 'gambling'];

export function InvestorIntakeForm({ onSubmit }: InvestorIntakeFormProps) {
  const [preferredSectors, setPreferredSectors] = useState<string[]>([]);
  const [avoidedSectors, setAvoidedSectors] = useState<string[]>([]);
  const [stageFocus, setStageFocus] = useState<Stage[]>([]);
  const [geographyFocus, setGeographyFocus] = useState<Geography[]>([]);
  const [evaluationWeights, setEvaluationWeights] = useState<EvaluationWeights>({
    founders: 30,
    sector_market: 25,
    traction: 20,
    product_tech: 15,
    round_dynamics: 10,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (preferredSectors.length === 0) {
      newErrors.preferredSectors = 'Please select at least one preferred sector';
    }

    if (stageFocus.length === 0) {
      newErrors.stageFocus = 'Please select at least one stage';
    }

    if (geographyFocus.length === 0) {
      newErrors.geographyFocus = 'Please select at least one geography';
    }

    if (!validateWeightagesSum(evaluationWeights)) {
      const sum = getWeightagesSum(evaluationWeights);
      newErrors.evaluationWeights = `Weightages must sum to 100% (current: ${sum}%)`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const profile: InvestorProfile = {
      preferred_sectors: preferredSectors,
      avoided_sectors: avoidedSectors,
      stage_focus: stageFocus,
      geography_focus: geographyFocus,
      evaluation_weights: evaluationWeights,
    };

    onSubmit(profile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 card">
      {/* Preferred Sectors */}
      <div>
        <label className="label">
          Preferred Sectors <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600 mb-3">
          Which sectors do you prefer to invest in?
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {COMMON_SECTORS.map((sector) => (
            <label key={sector} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={preferredSectors.includes(sector)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setPreferredSectors([...preferredSectors, sector]);
                  } else {
                    setPreferredSectors(preferredSectors.filter((s) => s !== sector));
                  }
                }}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 capitalize">{sector}</span>
            </label>
          ))}
        </div>
        {errors.preferredSectors && <p className="error-text">{errors.preferredSectors}</p>}
      </div>

      {/* Avoided Sectors */}
      <div>
        <label className="label">Avoided Sectors (Optional)</label>
        <p className="text-sm text-gray-600 mb-3">
          Which sectors do you avoid investing in?
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {COMMON_SECTORS.map((sector) => (
            <label key={sector} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={avoidedSectors.includes(sector)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setAvoidedSectors([...avoidedSectors, sector]);
                  } else {
                    setAvoidedSectors(avoidedSectors.filter((s) => s !== sector));
                  }
                }}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 capitalize">{sector}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Stage Focus */}
      <div>
        <label className="label">
          Stage Focus <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600 mb-3">
          Which stages do you invest in?
        </p>
        <StageSelect selected={stageFocus} onChange={setStageFocus} />
        {errors.stageFocus && <p className="error-text">{errors.stageFocus}</p>}
      </div>

      {/* Geography Focus */}
      <div>
        <label className="label">
          Geography Focus <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600 mb-3">
          Which geographies do you invest in?
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.values(Geography).map((geo) => (
            <label
              key={geo}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={geographyFocus.includes(geo)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setGeographyFocus([...geographyFocus, geo]);
                  } else {
                    setGeographyFocus(geographyFocus.filter((g) => g !== geo));
                  }
                }}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{geo}</span>
            </label>
          ))}
        </div>
        {errors.geographyFocus && (
          <p className="error-text">{errors.geographyFocus}</p>
        )}
      </div>

      {/* Evaluation Weightages */}
      <div>
        <label className="label">
          Evaluation Weightages <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600 mb-3">
          How do you weight different factors in your decisions? (must sum to 100%)
        </p>
        <WeightageSliders
          weights={evaluationWeights}
          onChange={setEvaluationWeights}
        />
        {errors.evaluationWeights && (
          <p className="error-text">{errors.evaluationWeights}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <button type="submit" className="btn-primary px-8">
          Start Playing
        </button>
      </div>
    </form>
  );
}
