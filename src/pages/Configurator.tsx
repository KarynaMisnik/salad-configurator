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

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("baseType BEFORE FETCH:", baseType);
        const [b, c, i] = await Promise.all([
          getBowls(baseType),
          getCategories(baseType),
          getIngredients(baseType),
        ]);

        setBowls(b);
        setCategories(c);
        setIngredients(i);
      } catch (error) {
        console.log("FETCHING with baseType:", baseType);
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
