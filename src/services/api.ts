//const BASE_URL = " localhost:3000/api/";
export async function getBowls() {
  const response = await fetch("https://fresse-api.onrender.com/api/bowls");
  //const response = await fetch(BASE_URL + "/bowls");
  const data = await response.json();
  return data;
}

export async function getCategories() {
  const response = await fetch(
    "https://fresse-api.onrender.com/api/categories",
  );
  //const response = await fetch(BASE_URL +"/categories");
  const data = await response.json();
  return data;
}

export async function getIngredients() {
  const response = await fetch(
    "https://fresse-api.onrender.com/api/ingredients",
  );
  // const response = await fetch(BASE_URL +"/ingredients");
  const data = await response.json();
  return data;
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
