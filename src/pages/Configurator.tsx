import { useState, useEffect } from "react";
import BowlSelection from "../components/BowlSelection";
import CenterBowl from "../components/CenterBowl";
import BaseSelection from "../components/BaseSelection";
import IngredientSection from "../components/IngredientSection";
import SummaryBar from "../components/SummaryBar";
import type { Bowl, Category, Ingredient } from "../types";
import { getBowls, getCategories, getIngredients } from "../services/api.ts";
import { useIngredientStore } from "../store/useIngredientStore.ts";

function Configurator() {
  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const baseType = useIngredientStore((state) => state.baseType);

  const filteredBowls = bowls.filter((bowl) => bowl.base_type_id === baseType);

  const filteredCategories = categories.filter(
    (category) => category.base_type_id === baseType,
  );

  const baseIngredients = ingredients.filter((i) => i.categoryId === 6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setBowls(await getBowls());
        setCategories(await getCategories());
        setIngredients(await getIngredients());
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
        <BowlSelection bowls={filteredBowls} />
        <CenterBowl />
        <BaseSelection ingredients={baseIngredients} />
      </div>

      {/* 👉 PASS FILTER CONTROL + FILTERED DATA */}
      <IngredientSection
        categories={filteredCategories}
        ingredients={ingredients}
      />

      <SummaryBar />
    </>
  );
}

export default Configurator;
