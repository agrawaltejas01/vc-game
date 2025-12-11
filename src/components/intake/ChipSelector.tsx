import { useState } from 'react';

interface ChipSelectorProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  label: string;
  required?: boolean;
  allowCustom?: boolean;
  customPlaceholder?: string;
}

export function ChipSelector({
  options,
  selected,
  onChange,
  label,
  required = false,
  allowCustom = false,
  customPlaceholder = 'Enter custom value'
}: ChipSelectorProps) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState('');

  const toggleSelection = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(s => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const handleAddCustom = () => {
    const trimmed = customValue.trim();
    if (trimmed && !selected.includes(trimmed) && trimmed.length <= 30) {
      onChange([...selected, trimmed]);
      setCustomValue('');
      setShowCustomInput(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustom();
    } else if (e.key === 'Escape') {
      setCustomValue('');
      setShowCustomInput(false);
    }
  };

  return (
    <div>
      <label className="label">
        {label} {required && <span className="text-semantic-error font-bold">*</span>}
      </label>
      <div className="flex flex-wrap gap-2">
        {/* Render selected items first (including custom ones) */}
        {selected.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => toggleSelection(item)}
            className="inline-flex items-center px-4 py-2 rounded-full border-2 border-primary-500 bg-primary-50 text-primary-900 font-semibold cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 shadow-chip"
          >
            {item}
          </button>
        ))}

        {/* Render unselected options */}
        {options.filter(opt => !selected.includes(opt)).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => toggleSelection(option)}
            className="inline-flex items-center px-4 py-2 rounded-full border-2 border-gray-300 bg-white text-black hover:border-black font-medium cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 shadow-chip hover:shadow-btn"
          >
            {option}
          </button>
        ))}

        {allowCustom && !showCustomInput && (
          <button
            type="button"
            onClick={() => setShowCustomInput(true)}
            className="inline-flex items-center px-4 py-2 rounded-full border-2 border-dashed border-gray-300 bg-white text-gray-600 hover:border-black hover:text-black font-medium cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            + Add custom
          </button>
        )}
      </div>

      {allowCustom && showCustomInput && (
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={customPlaceholder}
            maxLength={30}
            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 outline-none"
            autoFocus
          />
          <button
            type="button"
            onClick={handleAddCustom}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              setCustomValue('');
              setShowCustomInput(false);
            }}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg font-medium hover:border-black transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
