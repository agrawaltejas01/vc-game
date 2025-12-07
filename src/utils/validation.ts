// Validation utilities
import { EvaluationWeights } from '../types/investor';

export function validateWeightagesSum(weights: EvaluationWeights): boolean {
  const sum =
    weights.founders +
    weights.sector_market +
    weights.traction +
    weights.product_tech +
    weights.round_dynamics;

  return sum === 100;
}

export function getWeightagesSum(weights: EvaluationWeights): number {
  return (
    weights.founders +
    weights.sector_market +
    weights.traction +
    weights.product_tech +
    weights.round_dynamics
  );
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateRequired(value: any): boolean {
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return value !== null && value !== undefined && value !== '';
}
