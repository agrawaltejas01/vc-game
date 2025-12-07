import { Sector } from '../../types/investor';

interface SectorSelectProps {
  selected: Sector[];
  onChange: (sectors: Sector[]) => void;
  exclude?: Sector[];
}

export function SectorSelect({ selected, onChange, exclude = [] }: SectorSelectProps) {
  const availableSectors = Object.values(Sector).filter(
    (sector) => !exclude.includes(sector)
  );

  const toggleSector = (sector: Sector) => {
    if (selected.includes(sector)) {
      onChange(selected.filter((s) => s !== sector));
    } else {
      onChange([...selected, sector]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {availableSectors.map((sector) => (
        <label
          key={sector}
          className={`
            flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all
            ${
              selected.includes(sector)
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }
          `}
        >
          <input
            type="checkbox"
            checked={selected.includes(sector)}
            onChange={() => toggleSector(sector)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <span className="ml-3 text-sm font-medium text-gray-700">{sector}</span>
        </label>
      ))}
    </div>
  );
}
