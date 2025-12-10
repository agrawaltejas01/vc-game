import { Scenario } from '../../types/scenario';

interface ScenarioDetailsProps {
  scenario: Scenario;
}

export function ScenarioDetails({ scenario }: ScenarioDetailsProps) {
  const { business, founder_profile, round_details, traction_snapshot, tension, info_gaps, question_to_investor } = scenario;

  return (
    <div className="space-y-6">
      {/* Header: Stage & Sector */}
      <div className="flex flex-wrap gap-2">
        <span className="badge-primary">{scenario.stage}</span>
        <span className="badge-secondary">{scenario.sector}</span>
      </div>

      {/* Business Overview */}
      <div>
        <h2 className="text-2xl font-bold text-black mb-3">{business.one_liner}</h2>
        <div className="prose prose-sm max-w-none text-gray-700">
          <p>{business.description}</p>
        </div>
        <div className="mt-3">
          <p className="text-sm text-gray-600">
            <strong className="text-black">Business Model:</strong> {business.business_model}
          </p>
          {(business.is_pre_product || business.is_pre_revenue) && (
            <div className="mt-2">
              {business.is_pre_product && (
                <span className="inline-block px-3 py-1 bg-accent-gold-light text-accent-gold text-xs font-bold rounded-full border border-accent-gold">
                  Pre-product
                </span>
              )}
              {business.is_pre_revenue && !business.is_pre_product && (
                <span className="inline-block px-3 py-1 bg-accent-gold-light text-accent-gold text-xs font-bold rounded-full border border-accent-gold">
                  Pre-revenue
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Founder Profile */}
      <div className="card bg-gray-50">
        <h3 className="text-lg font-bold text-black mb-3">Founders & Team</h3>
        <p className="text-gray-700 mb-3">{founder_profile.summary}</p>
        {founder_profile.team_bullets && founder_profile.team_bullets.length > 0 && (
          <ul className="space-y-2">
            {founder_profile.team_bullets.map((bullet, idx) => (
              <li key={idx} className="text-sm text-gray-700 flex items-start">
                <span className="text-black mr-2 font-bold">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Round Details */}
      <div className="card-accent-blue">
        <h3 className="text-lg font-bold text-black mb-3">Round Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">Round Type</p>
            <p className="font-bold text-black">{round_details.round_type}</p>
          </div>
          <div>
            <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">Total Round</p>
            <p className="font-bold text-black">${(round_details.total_round_size_usd / 1000000).toFixed(1)}M</p>
          </div>
          {round_details.valuation_pre_money_usd && (
            <div>
              <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">Pre-Money Valuation</p>
              <p className="font-bold text-black">${(round_details.valuation_pre_money_usd / 1000000).toFixed(1)}M</p>
            </div>
          )}
          {round_details.valuation && (
            <div>
              <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">Valuation</p>
              <p className="font-bold text-black">${(round_details.valuation / 1000000).toFixed(1)}M</p>
            </div>
          )}
          <div>
            <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">Ask Amount</p>
            <p className="font-bold text-black">${(round_details.investor_ask_usd / 1000000).toFixed(2)}M</p>
          </div>
          {/* <div className="col-span-2">
            <p className="text-gray-600">Lead Status</p>
            <p className="font-semibold text-gray-900 capitalize">{'leading'}</p>
          </div> */}
          {round_details.other_investors && round_details.other_investors.length > 0 && (
            <div className="col-span-2">
              <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">Other Investors</p>
              <p className="text-sm text-gray-700">{round_details.other_investors.join(', ')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Traction Snapshot */}
      {traction_snapshot ? (
        <div className="card-accent-cyan">
          <h3 className="text-lg font-bold text-black mb-3">Traction</h3>
          <div className="space-y-2 text-sm">
            {traction_snapshot.revenue_arr_mrr && (
              <div>
                <span className="text-gray-600">Revenue:</span>{' '}
                <span className="font-bold text-black">{traction_snapshot.revenue_arr_mrr}</span>
              </div>
            )}
            {traction_snapshot.growth_rate && (
              <div>
                <span className="text-gray-600">Growth:</span>{' '}
                <span className="font-bold text-black">{traction_snapshot.growth_rate}</span>
              </div>
            )}
            {traction_snapshot.key_metrics && Object.entries(traction_snapshot.key_metrics).map(([key, value]) => (
              <div key={key}>
                {/* <span className="text-gray-600 capitalize">{key.replace(/_/g, ' ')}:</span>{' '} */}
                <span className="font-bold text-black">{value}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card bg-gray-100 border-l-4 border-gray-400">
          <p className="text-sm text-gray-600 italic">No traction metrics available yet (pre-product/pre-revenue)</p>
        </div>
      )}

      {/* Tension */}
      <div className="card-accent-gold">
        <h3 className="text-lg font-bold text-black mb-3">Key Tension</h3>
        <p className="text-gray-700 mb-3">{tension.description}</p>
        {tension.key_risks && tension.key_risks.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-black mb-2">Key Risks:</p>
            <ul className="space-y-1">
              {tension.key_risks.map((risk, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start">
                  <span className="text-accent-gold mr-2 font-bold">⚠</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Info Gaps */}
      {info_gaps && info_gaps.length > 0 && (
        <div className="card bg-semantic-errorLight border-l-4 border-semantic-error">
          <h3 className="text-lg font-bold text-black mb-3">Missing Information</h3>
          <ul className="space-y-2">
            {info_gaps.map((gap, idx) => (
              <li key={idx} className="text-sm">
                <span className="text-gray-700">{gap}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Question */}
      <div className="card bg-primary-50 border-4 border-primary-500">
        <h3 className="text-lg font-bold text-primary-900 mb-3">The Question</h3>
        <p className="text-black font-semibold text-lg">{question_to_investor}</p>
      </div>
    </div>
  );
}
