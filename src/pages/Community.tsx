
import { useEffect, useState } from "react";
import { getPublicRecipes, getBowls, getIngredients, getBaseIngredients } from "../services/api";
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
        const [recipesData, bowlsData, ingredientsData, baseIngredientsData] = await Promise.all([
          getPublicRecipes(),
          getBowls(),
          getIngredients(),
          getBaseIngredients(),
        ]);
        // Map API fields to camelCase for compatibility
        const mappedRecipes = recipesData.map((r: any) => ({
          id: r.id,
          userID: r.user_id,
          name: r.name,
          bowlId: r.bowl_id,
          ingredientIds: r.ingredient_ids,
          slots: r.slots,
          is_public: r.is_public,
        }));
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

  if (loading) return <div className="text-center py-10">Loading recipes...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  // Handler to load a recipe into the configurator
  const handleLoadRecipe = (recipe: Recipe) => {
    // Find the bowl
    const bowl = bowls.find((b) => b.id === recipe.bowlId) || null;
    if (!bowl) return alert("Bowl not found for this recipe.");

    // Find base ingredient (if present in slots)
    let base: BaseIngredient | null = null;
    if (recipe.slots && recipe.slots.base) {
      base = baseIngredients.find((b) => b.id === recipe.slots!.base?.id) || null;
    }

    // Build slots object
    let slots: Record<string, Ingredient | null> = {};
    if (recipe.slots) {
      for (const key in recipe.slots) {
        if (key === "base") continue;
        const ing = recipe.slots[key];
        if (ing) {
          const found = ingredients.find((i) => i.id === ing.id) || null;
          slots[key] = found;
        } else {
          slots[key] = null;
        }
      }
    } else {
      // fallback: fill slots from ingredientIds
      for (let i = 0; i < bowl.slot_count; i++) {
        const ingId = recipe.ingredientIds[i];
        const found = ingredients.find((i) => i.id === ingId) || null;
        slots[`slot-${i + 1}`] = found;
      }
    }

    // Only add base to slots if it is an Ingredient (not BaseIngredient)
    loadRecipe({
      bowl,
      base,
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
                {/* Placeholder for bowl/recipe image if available */}
                <span className="text-3xl text-[#A2D135] font-bold">🥗</span>
              </div>
              <h3 className="text-lg font-semibold mb-1 text-center">{recipe.name}</h3>
              <div className="text-xs text-gray-500 mb-2">by User {recipe.userID}</div>
              <div className="flex flex-wrap gap-1 justify-center text-xs text-gray-700 mb-2">
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
