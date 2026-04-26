import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BowlSelection from "../components/BowlSelection";
import CenterBowl from "../components/CenterBowl";
import BaseSelection from "../components/BaseSelection";
import IngredientSection from "../components/IngredientSection";
import SummaryBar from "../components/SummaryBar";
import SaveRecipeModal from "../components/SaveRecipeModal";

import type {
  Bowl,
  Category,
  Ingredient,
  BaseIngredient,
  Recipe,
} from "../types";

import {
  getBowls,
  getCategories,
  getIngredients,
  getBaseIngredients,
} from "../services/api";

import { useIngredientStore } from "../store/useIngredientStore";
import { useAuthStore } from "../store/useAuthStore";
import { usePriceStore } from "../store/usePriceStore";

function Configurator() {
  // --------------------------- STATE --------------------------- //
  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [baseIngredients, setBaseIngredients] = useState<BaseIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const navigate = useNavigate();

  // --------------------------- STORE --------------------------- //
  const baseType = useIngredientStore((state) => state.baseType);
  const saveRecipe = useIngredientStore((state) => state.saveRecipe);
  const loadRecipe = useIngredientStore((state) => state.loadRecipe);
  const clearSelection = useIngredientStore((s) => s.clearSelection);

  // Fetch prices when token is present
  const token = useAuthStore((state) => state.token);
  const fetchPrices = usePriceStore((state) => state.fetchPrices);
  useEffect(() => {
    if (token) {
      fetchPrices(token);
    }
  }, [token, fetchPrices]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const [b, c, i, bi] = await Promise.all([
          getBowls(baseType),
          getCategories(),
          getIngredients(),
          getBaseIngredients(),
        ]);

        const filteredCategories: Category[] = c.filter(
          (cat: Category) => cat.base_type_id === baseType,
        );

        const allowedCategoryIds = filteredCategories.map((c) => c.id);

        const filteredIngredients = i.filter((ing: Ingredient) =>
          allowedCategoryIds.includes(ing.categoryId),
        );

        setBowls(b);
        setCategories(filteredCategories);
        setIngredients(filteredIngredients);

        const filteredBases =
          baseType === 1
            ? bi.filter((b: BaseIngredient) => b.categoryId === 6)
            : [];

        setBaseIngredients(filteredBases);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [baseType]);

  // --------------------------- SAVE HANDLER --------------------------- //
  const handleSave = async ({
    name,
    isPublic,
  }: {
    name: string;
    isPublic: boolean;
  }) => {
    if (!token) {
      alert("You must be logged in");
      return;
    }

    await saveRecipe(name, token, isPublic);
    clearSelection();
  };

  // ---------------------------  LOAD RECIPE (from community) --------------------------- //
  const handleLoadRecipe = (recipe: Recipe) => {
    const bowl = bowls.find((b) => b.id === recipe.bowlId);
    if (!bowl) return alert("Bowl not found");

    const slots: Record<string, Ingredient | null> = {};

    recipe.ingredientIds.forEach((id, index) => {
      const ingredient = ingredients.find((i) => i.id === id) || null;

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

  // --------------------------- LOADING UI --------------------------- //
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#A2D135] mb-4" />
        <span className="text-lg text-white">Ladataan...</span>
      </div>
    );
  }

  // --------------------------- UI --------------------------- //
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
        <BowlSelection bowls={bowls} />

        <CenterBowl onSaveClick={() => setIsSaveOpen(true)} />

        <BaseSelection ingredients={baseIngredients} />
      </div>

      <IngredientSection categories={categories} ingredients={ingredients} />

      <SummaryBar />

      <SaveRecipeModal
        isOpen={isSaveOpen}
        onClose={() => setIsSaveOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}

export default Configurator;
