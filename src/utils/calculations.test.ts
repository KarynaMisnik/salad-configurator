import { describe, it, expect } from "vitest";
import { calculateTotal, type Ingredient } from "./calculations";

describe("calculateTotal", () => {
  it("adds weights correctly", () => {
    const mockIngredients: Ingredient[] = [
      { id: 1, weight: 50 },
      { id: 2, weight: 100 },
    ];

    const result = calculateTotal(mockIngredients);

    expect(result).toBe(150);
  });
});
