export interface BaseType {
  // Shared fields used by bowls and ingredients.
  id: number;
  name: string;
  price: number;
  image_url: string;
  baracode_url: string;
}

export interface Bowl extends BaseType {
  base_type_id: number;
  volume: number;
  slot_count: number;
  shape: "round" | "square";
}

export interface Category {
  id: number;
  name: string;
  base_type_id: number;
}

export interface Ingredient extends BaseType {
  // camelCase here maps to category relation used in React components.
  categoryId: number;
  name: string;
  diets: string[];
  weight_grams: number;
}

export interface User {
  user_id: number;
  email: string;
  name: string;
  role: string;
}

export interface Recipe {
  id: number;
  userID: number;
  name: string;
  bowlId: number;
  ingredientIds: number[];
  slots?: Record<string, Ingredient | null>;
  is_public: boolean;
}

export interface PriceListItem {
  id: number;
  item_id: number;
  price: number;
  type: string;
}

export interface BaseIngredient {
  id: number;
  categoryId: number;
  name: string;
  weight_grams: number;
  image_url: string;
}