import { useState, useEffect } from 'react';

interface ChequeSizeRangeProps {
  minValue: number;
  maxValue: number;
  onChange: (min: number, max: number) => void;
}

// Predefined cheque size options from $50K to $5M
const CHEQUE_SIZES = [
  50000,    // $50K
  100000,   // $100K
  250000,   // $250K
  500000,   // $500K
  1000000,  // $1M
  2000000,  // $2M
  3000000,  // $3M
  5000000,  // $5M
];

const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  return `$${(value / 1000).toFixed(0)}K`;
};

export function ChequeSizeRange({ minValue, maxValue, onChange }: ChequeSizeRangeProps) {
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(CHEQUE_SIZES.length - 1);

  // Initialize indices based on prop values
  useEffect(() => {
    const minIdx = CHEQUE_SIZES.findIndex(size => size >= minValue);
    const maxIdx = CHEQUE_SIZES.findIndex(size => size >= maxValue);

    setMinIndex(minIdx >= 0 ? minIdx : 0);
    setMaxIndex(maxIdx >= 0 ? maxIdx : CHEQUE_SIZES.length - 1);
  }, []);

  const handleMinChange = (newMinIndex: number) => {
    // Ensure min doesn't exceed max
    const adjustedMinIndex = Math.min(newMinIndex, maxIndex);
    setMinIndex(adjustedMinIndex);
    onChange(CHEQUE_SIZES[adjustedMinIndex], CHEQUE_SIZES[maxIndex]);
  };

  const handleMaxChange = (newMaxIndex: number) => {
    // Ensure max doesn't go below min
    const adjustedMaxIndex = Math.max(newMaxIndex, minIndex);
    setMaxIndex(adjustedMaxIndex);
    onChange(CHEQUE_SIZES[minIndex], CHEQUE_SIZES[adjustedMaxIndex]);
  };

  // Calculate the position of the active range bar
  const minPercent = (minIndex / (CHEQUE_SIZES.length - 1)) * 100;
  const maxPercent = (maxIndex / (CHEQUE_SIZES.length - 1)) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Cheque Size Range
        </label>
        <span className="text-sm font-semibold text-primary-600">
          {formatCurrency(CHEQUE_SIZES[minIndex])} - {formatCurrency(CHEQUE_SIZES[maxIndex])}
        </span>
      </div>

      {/* Dual Range Slider */}
      <div className="relative pt-6 pb-2">
        {/* Track background */}
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full transform -translate-y-1/2"></div>

        {/* Active range */}
        <div
          className="absolute top-1/2 h-2 bg-primary-500 rounded-full transform -translate-y-1/2"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        ></div>

        {/* Min slider */}
        <input
          type="range"
          min="0"
          max={CHEQUE_SIZES.length - 1}
          step="1"
          value={minIndex}
          onChange={(e) => handleMinChange(parseInt(e.target.value))}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
          style={{ zIndex: minIndex > maxIndex - 1 ? 5 : 3 }}
        />

        {/* Max slider */}
        <input
          type="range"
          min="0"
          max={CHEQUE_SIZES.length - 1}
          step="1"
          value={maxIndex}
          onChange={(e) => handleMaxChange(parseInt(e.target.value))}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
          style={{ zIndex: 4 }}
        />
      </div>

      {/* Range labels */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>{formatCurrency(CHEQUE_SIZES[0])}</span>
        <span>{formatCurrency(CHEQUE_SIZES[CHEQUE_SIZES.length - 1])}</span>
      </div>
    </div>
  );
}
