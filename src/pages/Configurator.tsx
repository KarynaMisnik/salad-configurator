import { useState, useEffect } from "react";
import BowlSelection from "../components/BowlSelection";
import CenterBowl from "../components/CenterBowl";
import BaseSelection from "../components/BaseSelection";
import IngredientSection from "../components/IngredientSection";
import SummaryBar from "../components/SummaryBar";
import type { Bowl, Category, Ingredient } from "../types";
import { getBowls, getCategories, getIngredients } from "../services/api.ts";

function Configurator() {
  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bowls = await getBowls();
        setBowls(bowls);

        const categories = await getCategories();
        setCategories(categories);

        const ingredients = await getIngredients();
        setIngredients(ingredients);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
      <BowlSelection bowls={bowls} />
      <CenterBowl />
      <BaseSelection ingredients={ingredients} />
      <IngredientSection categories={categories} ingredients={ingredients} />
      <SummaryBar />
    </div>
  );
}

export default Configurator;
