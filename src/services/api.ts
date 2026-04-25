import type { Recipe } from "../types";

export async function getPublicRecipes(): Promise<Recipe[]> {
  const res = await fetch("https://fresse-api.onrender.com/api/recipes");
  if (!res.ok) throw new Error("Failed to fetch recipes");
  return res.json();
}
import type { BaseIngredient } from "../types";

//const BASE_URL = " localhost:3000/api/";
export async function getBowls(typeId?: number) {
  const url = typeId
    ? `https://fresse-api.onrender.com/api/bowls?type_id=${typeId}`
    : `https://fresse-api.onrender.com/api/bowls`;

  const res = await fetch(url);
  return res.json();
}

export async function getCategories(typeId?: number) {
  const url = typeId
    ? `https://fresse-api.onrender.com/api/categories?type_id=${typeId}`
    : `https://fresse-api.onrender.com/api/categories`;

  const res = await fetch(url);
  return res.json();
}

export async function getIngredients(typeId?: number){
   const url = typeId
    ? `https://fresse-api.onrender.com/api/ingredients?type_id=${typeId}`
    : `https://fresse-api.onrender.com/api/ingredients`;
 
 
 const res = await fetch(url);
  return res.json();

}


export async function getBaseIngredients() {
  const res = await fetch(
    "https://fresse-api.onrender.com/api/baseingredients",
  );

  const data = await res.json();

  
  return data.filter((item: BaseIngredient) => item.categoryId === 6);
}

export const saveRecipe = async (
  token: string,
  recipeData: {
    name: string;
    bowlId: string;
    ingredientIds: string[];
  },
) => {
  const response = await fetch("https://fresse-api.onrender.com/api/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipeData),
  });

  if (!response.ok) {
    throw new Error("Failed to save recipe");
  }

  return await response.json();
};

//LOGIN LOGIC
export const login = async (email: string, password: string) => {
  const response = await fetch(
    "https://fresse-api.onrender.com/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json();
};
