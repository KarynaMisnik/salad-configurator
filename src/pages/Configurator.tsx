import { useState, useEffect } from "react";
import BowlSelection from "../components/BowlSelection";
import CenterBowl from "../components/CenterBowl";
import BaseSelection from "../components/BaseSelection";
import IngredientSection from "../components/IngredientSection";
import SummaryBar from "../components/SummaryBar";
import type { Bowl, Category, Ingredient } from "../types";
import { getBowls, getCategories, getIngredients } from "../services/api";
import { useIngredientStore } from "../store/useIngredientStore";

function Configurator() {
  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const baseType = useIngredientStore((state) => state.baseType);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [b, c, i]: [Bowl[], Category[], Ingredient[]] = await Promise.all(
          [getBowls(baseType), getCategories(), getIngredients()],
        );

        const filteredCategories = c.filter(
          (cat) => cat.base_type_id === baseType,
        );

        const allowedCategoryIds = filteredCategories.map((cat) => cat.id);

        const filteredIngredients = i.filter((ing) =>
          allowedCategoryIds.includes(ing.categoryId),
        );

        setBowls(b);
        setCategories(filteredCategories);
        setIngredients(filteredIngredients);
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
        <BaseSelection ingredients={ingredients} />
      </div>

      <IngredientSection categories={categories} ingredients={ingredients} />

      <SummaryBar />
    </>
  );
}

export default Configurator;
