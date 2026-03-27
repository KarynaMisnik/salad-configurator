import { useState } from "react";
import BowlSelection from "../components/BowlSelection";
import CenterBowl from "../components/CenterBowl";
import BaseSelection from "../components/BaseSelection";
import IngredientSection from "../components/IngredientSection";
import SummaryBar from "../components/SummaryBar";
import type { Bowl, Category, Ingredient } from "../types";

function Configurator() {
  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
      <BowlSelection />
      <CenterBowl />
      <BaseSelection />
      <IngredientSection />
      <SummaryBar />
    </div>
  );
}

export default Configurator;