import type { Ingredient } from "../types";

export function calculateTotalWeight(ingredients: Ingredient[]): number {
  return ingredients.reduce((sum, item) => sum + item.weight_grams, 0);
}
