export type Ingredient = {
  id: number;
  weight: number;
};

export function calculateTotal(ingredients: Ingredient[]): number {
  return ingredients.reduce((sum: number, item: Ingredient) => {
    return sum + item.weight;
  }, 0);
}