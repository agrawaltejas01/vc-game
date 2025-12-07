import { InvestorVector as InvestorVectorType } from '../../types/scenario';

interface InvestorVectorProps {
  vector: InvestorVectorType | null;
}

export function InvestorVector({ vector }: InvestorVectorProps) {
  if (!vector) {
    return (
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Your Preference Profile
        </h3>
        <p className="text-gray-600 text-sm">
          Your preference profile will appear here after you respond to scenarios.
        </p>
      </div>
    );
  }

  const { quantitative_metrics, qualitative_insights, decision_patterns, risk_tolerance, other_metadata } = vector;

  return (
    <div className="p-6 space-y-6 sticky top-0">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Your Preference Profile
        </h3>
        <p className="text-xs text-gray-500">
          Live analysis based on your responses
        </p>
      </div>

      {/* Quantitative Metrics */}
      <div className="card">
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">Evaluation Focus</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">Founders</span>
              <span className="font-semibold text-gray-900">{quantitative_metrics.founders}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${quantitative_metrics.founders}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">Sector / Market</span>
              <span className="font-semibold text-gray-900">{quantitative_metrics.sector_market}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${quantitative_metrics.sector_market}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">Traction</span>
              <span className="font-semibold text-gray-900">{quantitative_metrics.traction}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${quantitative_metrics.traction}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">Product / Tech</span>
              <span className="font-semibold text-gray-900">{quantitative_metrics.product_tech}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${quantitative_metrics.product_tech}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">Round Dynamics</span>
              <span className="font-semibold text-gray-900">{quantitative_metrics.round_dynamics}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${quantitative_metrics.round_dynamics}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Qualitative Insights */}
      {qualitative_insights.length > 0 && (
        <div className="card bg-blue-50">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Emerging Insights</h4>
          <ul className="space-y-2">
            {qualitative_insights.map((insight, idx) => (
              <li key={idx} className="text-xs text-gray-700 flex items-start">
                <span className="text-blue-600 mr-2 mt-0.5">→</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Decision Patterns */}
      {decision_patterns.length > 0 && (
        <div className="card bg-green-50">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Decision Patterns</h4>
          <ul className="space-y-2">
            {decision_patterns.map((pattern, idx) => (
              <li key={idx} className="text-xs text-gray-700 flex items-start">
                <span className="text-green-600 mr-2 mt-0.5">✓</span>
                <span>{pattern}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Risk Tolerance */}
      {risk_tolerance && (
        <div className="card bg-yellow-50">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Risk Tolerance</h4>
          <p className="text-xs text-gray-700">{risk_tolerance}</p>
        </div>
      )}

      {/* Other Metadata */}
      {other_metadata && Object.keys(other_metadata).length > 0 && (
        <div className="card bg-gray-50">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Additional Insights</h4>
          <div className="space-y-2">
            {Object.entries(other_metadata).map(([key, value]) => (
              <div key={key} className="text-xs">
                <span className="text-gray-600 capitalize">{key.replace(/_/g, ' ')}:</span>{' '}
                <span className="text-gray-900">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
