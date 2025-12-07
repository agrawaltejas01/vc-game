import { DecisionPattern } from '../../types/game';

interface DecisionPatternsProps {
  patterns: DecisionPattern[];
}

export function DecisionPatterns({ patterns }: DecisionPatternsProps) {
  const confidenceColors = {
    high: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Your Decision Patterns
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Key patterns we identified in how you evaluate investment opportunities
      </p>

      <div className="space-y-6">
        {patterns.map((pattern, idx) => (
          <div key={idx} className="border-l-4 border-primary-500 pl-4">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-900">{pattern.pattern}</h4>
              <span
                className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                  confidenceColors[pattern.confidence]
                }`}
              >
                {pattern.confidence} confidence
              </span>
            </div>

            {pattern.examples.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-medium text-gray-600 mb-2">Evidence:</p>
                <ul className="space-y-1">
                  {pattern.examples.map((example, exIdx) => (
                    <li key={exIdx} className="text-sm text-gray-700 flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
