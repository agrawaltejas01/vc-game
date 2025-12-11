import { useState } from 'react';
import { InvestorProfile, Stage, EvaluationWeights } from '../../types/investor';
import { validateWeightagesSum, getWeightagesSum } from '../../utils/validation';
import { StageSelect } from './StageSelect';
import { WeightageSliders } from './WeightageSliders';
import { ChipSelector } from './ChipSelector';

interface InvestorIntakeFormProps {
  onSubmit: (profile: InvestorProfile) => void;
}

const COMMON_SECTORS = ['fintech', 'ai', 'healthtech', 'consumer', 'saas', 'enterprise', 'deeptech', 'edtech', 'defence', 'gambling'];
const DEFAULT_GEOGRAPHIES = ['India'];

export function InvestorIntakeForm({ onSubmit }: InvestorIntakeFormProps) {
  const [preferredSectors, setPreferredSectors] = useState<string[]>([]);
  const [avoidedSectors, setAvoidedSectors] = useState<string[]>([]);
  const [stageFocus, setStageFocus] = useState<Stage[]>([]);
  const [geographyFocus, setGeographyFocus] = useState<string[]>(['India']);
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

  // Mutual exclusion logic - filter sectors based on opposite list selection
  const availablePreferredSectors = COMMON_SECTORS.filter(
    sector => !avoidedSectors.includes(sector)
  );

  const availableAvoidedSectors = COMMON_SECTORS.filter(
    sector => !preferredSectors.includes(sector)
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8 card">
      {/* Preferred Sectors */}
      <div>
        <p className="text-sm text-gray-600 mb-3">
          Which sectors do you prefer to invest in?
        </p>
        <ChipSelector
          label="Preferred Sectors"
          required={true}
          options={availablePreferredSectors}
          selected={preferredSectors}
          onChange={setPreferredSectors}
          allowCustom={true}
          customPlaceholder="Enter sector name"
        />
        {errors.preferredSectors && <p className="error-text mt-2">{errors.preferredSectors}</p>}
      </div>

      {/* Avoided Sectors */}
      <div>
        <p className="text-sm text-gray-600 mb-3">
          Which sectors do you avoid investing in?
        </p>
        <ChipSelector
          label="Avoided Sectors (Optional)"
          required={false}
          options={availableAvoidedSectors}
          selected={avoidedSectors}
          onChange={setAvoidedSectors}
          allowCustom={true}
          customPlaceholder="Enter sector name"
        />
      </div>

      {/* Stage Focus */}
      <div>
        <label className="label">
          Stage Focus <span className="text-semantic-error font-bold">*</span>
        </label>
        <p className="text-sm text-gray-600 mb-3">
          Which stages do you invest in?
        </p>
        <StageSelect selected={stageFocus} onChange={setStageFocus} />
        {errors.stageFocus && <p className="error-text">{errors.stageFocus}</p>}
      </div>

      {/* Geography Focus */}
      <div>
        <p className="text-sm text-gray-600 mb-3">
          Which geographies do you invest in?
        </p>
        <ChipSelector
          label="Geography Focus"
          required={true}
          options={DEFAULT_GEOGRAPHIES}
          selected={geographyFocus}
          onChange={setGeographyFocus}
          allowCustom={true}
          customPlaceholder="Enter geography name"
        />
        {errors.geographyFocus && (
          <p className="error-text mt-2">{errors.geographyFocus}</p>
        )}
      </div>

      {/* Evaluation Weightages */}
      <div>
        <label className="label">
          Evaluation Weightages <span className="text-semantic-error font-bold">*</span>
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
