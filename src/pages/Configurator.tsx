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

function Configurator() {
  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [baseIngredients, setBaseIngredients] = useState<BaseIngredient[]>([]);

  const baseType = useIngredientStore((state) => state.baseType);

  useEffect(() => {
    const fetchData = async () => {
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

        // IMPORTANT FIX:
        setBaseIngredients(
          bi.filter((b: BaseIngredient) => b.categoryId === 6),
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [baseType]);

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
