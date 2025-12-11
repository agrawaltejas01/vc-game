import { useState } from 'react';
import { InvestorProfile, Stage, EvaluationWeights } from '../../types/investor';
import { validateWeightagesSum, getWeightagesSum } from '../../utils/validation';
import { StageSelect } from './StageSelect';
import { WeightageSliders } from './WeightageSliders';
import { ChipSelector } from './ChipSelector';

interface InvestorIntakeFormProps {
  onSubmit: (profile: InvestorProfile) => void;
}

const COMMON_SECTORS = ['SaaS','AI','Fintech','Enterprise Software', 'Consumer', 'DevTools','HealthTech','DeepTech'];
const DEFAULT_GEOGRAPHIES = ['India'];

export function InvestorIntakeForm({ onSubmit }: InvestorIntakeFormProps) {
  const [preferredSectors, setPreferredSectors] = useState<string[]>([]);
  const [avoidedSectors, setAvoidedSectors] = useState<string[]>([]);
  const [stageFocus, setStageFocus] = useState<Stage[]>([]);
  const [chequeSizeMin, setChequeSizeMin] = useState<string>('');
  const [chequeSizeMax, setChequeSizeMax] = useState<string>('');
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

    if (!chequeSizeMin.trim() || !chequeSizeMax.trim()) {
      newErrors.chequeSize = 'Please provide both minimum and maximum cheque sizes';
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
      cheque_size_min: chequeSizeMin,
      cheque_size_max: chequeSizeMax,
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
        <ChipSelector
          label="Avoided Sectors"
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

        <StageSelect selected={stageFocus} onChange={setStageFocus} />
        {errors.stageFocus && <p className="error-text">{errors.stageFocus}</p>}
      </div>

      {/* Cheque Size */}
      <div>
        <label className="label">
          Cheque Size (USD) <span className="text-semantic-error font-bold">*</span>
        </label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={chequeSizeMin}
            onChange={(e) => setChequeSizeMin(e.target.value)}
            placeholder="250K"
            maxLength={10}
            className="w-24 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 outline-none text-center"
          />
          <span className="text-gray-600 font-medium">to</span>
          <input
            type="text"
            value={chequeSizeMax}
            onChange={(e) => setChequeSizeMax(e.target.value)}
            placeholder="2M"
            maxLength={10}
            className="w-24 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 outline-none text-center"
          />
        </div>
        {errors.chequeSize && <p className="error-text mt-2">{errors.chequeSize}</p>}
      </div>

      {/* Geography Focus */}
      <div>

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
          How do you weight different factors in your decisions?
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
