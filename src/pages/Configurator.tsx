import { useState, useEffect } from "react";
import BowlSelection from "../components/BowlSelection";
import CenterBowl from "../components/CenterBowl";
import BaseSelection from "../components/BaseSelection";
import IngredientSection from "../components/IngredientSection";
import SummaryBar from "../components/SummaryBar";

import type { Bowl, Category, Ingredient, BaseIngredient } from "../types";
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
  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [baseIngredients, setBaseIngredients] = useState<BaseIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const baseType = useIngredientStore((state) => state.baseType);
  const selectedBowl = useIngredientStore((state) => state.selectedBowl);
  const setBowl = useIngredientStore((state) => state.setBowl);

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

        const filteredCategories = c.filter(
          (cat: Category) => cat.base_type_id === baseType,
        );

        const allowedCategoryIds = filteredCategories.map(
          (cat: Category) => cat.id,
        );

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
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [baseType]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#A2D135] mb-4"></div>
        <span className="text-lg text-white">Ladataan...</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
        <BowlSelection bowls={bowls} />
        <CenterBowl />
        <BaseSelection ingredients={baseIngredients} />
      </div>

      <IngredientSection categories={categories} ingredients={ingredients} />

      <SummaryBar />
    </>
  );
}

export default Configurator;
