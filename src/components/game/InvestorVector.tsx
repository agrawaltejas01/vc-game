import { useState, useEffect } from "react";
import { InvestorVector as InvestorVectorType } from "../../types/scenario";
import { Badge } from "../common/Badge";
import { isFeatureEnabled } from "../../config/engagementFeatures";
import { useGameContext } from "../../context/GameContext";

interface InvestorVectorProps {
  vector: InvestorVectorType | null;
}

export function InvestorVector({ vector }: InvestorVectorProps) {
  const { previousMetrics, updatePreviousMetrics } = useGameContext();
  const [metricChanges, setMetricChanges] = useState<
    Record<string, "up" | "down" | null>
  >({});

  // Detect metric changes
  useEffect(() => {
    if (
      !vector ||
      !vector.quantitative_metrics ||
      !isFeatureEnabled("showMetricChangeIndicators")
    )
      return;

    if (previousMetrics) {
      const changes: Record<string, "up" | "down" | null> = {};
      Object.keys(vector.quantitative_metrics).forEach((key) => {
        const current =
          vector.quantitative_metrics[
            key as keyof typeof vector.quantitative_metrics
          ];
        const previous = previousMetrics[key as keyof typeof previousMetrics];
        if (current > previous) changes[key] = "up";
        else if (current < previous) changes[key] = "down";
        else changes[key] = null;
      });
      setMetricChanges(changes);

      // Clear after 3 seconds
      setTimeout(() => setMetricChanges({}), 3000);
    }

    updatePreviousMetrics(vector.quantitative_metrics);
  }, [vector]);

  if (!vector) {
    return (
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Your Preference Profile
        </h3>
        <p className="text-gray-600 text-sm">
          Your preference profile will appear here after you respond to
          scenarios.
        </p>
      </div>
    );
  }

  const {
    quantitative_metrics,
    qualitative_insights,
    decision_patterns,
    risk_tolerance,
    other_metadata,
  } = vector;

  return (
    <div className="p-6 space-y-6 sticky top-0">
      <div>
        <h3 className="text-lg font-bold text-black mb-1">
          Your Preference Profile
        </h3>
        <p className="text-xs text-gray-500">
          Live analysis based on your responses. Your honest take and a
          descriptive answer helps map better!
        </p>
      </div>

      {/* Quantitative Metrics */}
      <div className="card">
        <h4 className="font-bold text-black mb-3 text-sm">Evaluation Focus</h4>
        <div className="space-y-3">
          {Object.entries(quantitative_metrics).map(([key, value]) => (
            <div key={key}>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-gray-700 font-medium capitalize">
                  {key.replace(/_/g, " ")}
                </span>
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-black">
                    {Math.round(value)}%
                  </span>
                  {metricChanges[key] === "up" && (
                    <Badge
                      text="↑"
                      variant="change-up"
                      color="primary"
                      animate={true}
                    />
                  )}
                  {metricChanges[key] === "down" && (
                    <Badge
                      text="↓"
                      variant="change-down"
                      color="gray"
                      animate={true}
                    />
                  )}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-black h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Qualitative Insights */}
      {qualitative_insights.length > 0 && (
        <div className="card-accent-cyan relative">
          {isFeatureEnabled("showNewInsightBadges") && (
            <Badge
              text="NEW"
              variant="new"
              color="primary"
              className="absolute top-3 right-3"
            />
          )}
          <h4 className="font-bold text-black mb-3 text-sm">
            Emerging Insights
          </h4>
          <ul className="space-y-2">
            {qualitative_insights.map((insight, idx) => (
              <li
                key={idx}
                className="text-xs text-gray-700 flex items-start animate-slide-in-left"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <span className="text-accent-cyan mr-2 mt-0.5 font-bold">
                  →
                </span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Decision Patterns */}
      {decision_patterns.length > 0 && (
        <div className="card-accent-blue">
          <h4 className="font-bold text-black mb-3 text-sm inline-flex items-center">
            Decision Patterns
            {isFeatureEnabled("showPatternCountAnimation") && (
              <Badge
                text={`${decision_patterns.length}`}
                variant="count"
                color="gray"
                className="ml-2"
              />
            )}
          </h4>
          <ul className="space-y-2">
            {decision_patterns.map((pattern, idx) => (
              <li key={idx} className="text-xs text-gray-700 flex items-start">
                <span className="text-accent-blue mr-2 mt-0.5 font-bold">
                  ✓
                </span>
                <span>{pattern.replace(/_/g, " ")}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Risk Tolerance */}
      {risk_tolerance && (
        <div className="card-accent-gold">
          <h4 className="font-bold text-black mb-2 text-sm">Risk Tolerance</h4>
          <p className="text-xs text-gray-700">{risk_tolerance}</p>
        </div>
      )}

      {/* Other Metadata */}
      {other_metadata && Object.keys(other_metadata).length > 0 && (
        <div className="card bg-gray-50">
          <h4 className="font-bold text-black mb-3 text-sm">
            Additional Insights
          </h4>
          <div className="space-y-2">
            {Object.entries(other_metadata).map(([key, value]) => (
              <div key={key} className="text-xs">
                <span className="text-gray-600 capitalize">
                  {key.replace(/_/g, " ")}:
                </span>{" "}
                <span className="text-black">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
