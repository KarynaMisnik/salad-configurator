import { useEffect, useState } from "react";

import {
  getPublicRecipes,
  getBowls,
  getIngredients,
  getBaseIngredients,
} from "../services/api";
import type { Recipe, Bowl, Ingredient, BaseIngredient } from "../types";
import { useNavigate } from "react-router-dom";
import { useIngredientStore } from "../store/useIngredientStore";

function Community() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [baseIngredients, setBaseIngredients] = useState<BaseIngredient[]>([]);

  const navigate = useNavigate();
  const loadRecipe = useIngredientStore((state) => state.loadRecipe);

  useEffect(() => {
    async function fetchAll() {
      try {
        setLoading(true);

        const [recipesData, bowlsData, ingredientsData, baseIngredientsData] =
          await Promise.all([
            getPublicRecipes(),
            getBowls(),
            getIngredients(),
            getBaseIngredients(),
          ]);

        const mappedRecipes: Recipe[] = recipesData
          .map((r: any) => {
            const rawBowlId = r.bowl_id ?? r.bowlId;

            const parsedBowlId =
              typeof rawBowlId === "number"
                ? rawBowlId
                : parseInt(rawBowlId, 10);

            if (Number.isNaN(parsedBowlId)) return null; // 🚫 drop bad recipes

            return {
              id: r.id,
              userID: r.user_id,
              name: r.name,
              bowlId: parsedBowlId,

              ingredientIds: Array.isArray(r.ingredient_ids)
                ? r.ingredient_ids.map(Number)
                : Array.isArray(r.ingredientIds)
                  ? r.ingredientIds.map(Number)
                  : r.slots
                    ? Object.values(r.slots)
                        .filter(Boolean)
                        .map((i: any) => Number(i.id))
                    : [],

              slots: r.slots ?? {},
              is_public: r.is_public,
            };
          })
          .filter(Boolean) as Recipe[];

        setRecipes(mappedRecipes);

        setRecipes(mappedRecipes);
        setBowls(bowlsData);
        setIngredients(ingredientsData);
        setBaseIngredients(baseIngredientsData);
      } catch (e) {
        setError("Failed to load recipes");
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  if (loading)
    return <div className="text-center py-10">Loading recipes...</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;

  const handleLoadRecipe = (recipe: Recipe) => {
    if (!recipe.bowlId) {
      return alert("This recipe has invalid bowl data");
    }

    const bowl = bowls.find((b) => Number(b.id) === recipe.bowlId);

    if (!bowl) {
      return alert("Bowl not found for this recipe.");
    }

    const slots: Record<string, Ingredient | null> = {};

    (recipe.ingredientIds ?? []).forEach((id, index) => {
      const ingredient =
        ingredients.find((i) => Number(i.id) === Number(id)) || null;

      slots[`slot-${index + 1}`] = ingredient;
    });

    loadRecipe({
      bowl,
      base: null,
      slots,
      baseType: bowl.base_type_id,
    });

    navigate("/");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Community Recipes</h2>

      {recipes.length === 0 ? (
        <div className="text-center text-gray-500">No recipes found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md p-5 flex flex-col items-center hover:shadow-lg transition-shadow"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-3xl text-[#A2D135] font-bold">🥗</span>
              </div>

              <h3 className="text-lg font-semibold mb-1 text-center">
                {recipe.name}
              </h3>

              <div className="text-xs text-gray-500 mb-2">
                by User {recipe.userID}
              </div>

              <div className="text-xs text-gray-700 mb-2">
                Ingredients: {recipe.ingredientIds.length}
              </div>

              <button
                className="mt-2 px-4 py-1 rounded-full bg-[#A2D135] text-black font-bold hover:bg-[#8bb02b] transition-colors"
                onClick={() => handleLoadRecipe(recipe)}
              >
                Load to Bowl
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Community;
