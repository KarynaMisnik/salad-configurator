import { useState } from "react";
import type { Category, Ingredient } from "../types";
import IngredientCard from "./IngredientCard";

interface IngredientSectionProps {
  categories: Category[];
  ingredients: Ingredient[];
}

export default function IngredientSection({
  categories,
  ingredients,
}: IngredientSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedSearchQuery = searchQuery.toLowerCase();

  // Base category is shown in the dedicated base panel, so skip it here.
  const filteredCategories = categories.filter((c) => c.id !== 6);
  const filteredIngredients = ingredients.filter(
    (ingredient) =>
      ingredient.categoryId !== 6 &&
      (activeCategory === "all" ||
        ingredient.categoryId === Number(activeCategory)) &&
      ingredient.name.toLowerCase().includes(normalizedSearchQuery),
  );

  return (
    <section className="bg-zinc-800 rounded-[3rem] m-4 p-8 text-white w-full shadow-lg ">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search ingredients..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="rounded-full px-6 py-3 text-white outline-none w-64 border-2 border-white focus:border-[#A2D135]"
        />
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {filteredCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(String(category.id))}
            className={`font-bold px-6 py-2 rounded-full ${
              activeCategory === String(category.id)
                ? "bg-white text-black"
                : "bg-[#A2D135] text-black"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {filteredIngredients.map((ingredient) => (
          <IngredientCard key={ingredient.id} ingredient={ingredient} />
        ))}
      </div>
    </section>
  );
}
