import { useState } from "react";
import type { Category, Ingredient } from "../types";
import IngredientCard from "./IngredientCard";

interface IngredientSectionProps {
  categories: Category[];
  ingredients: Ingredient[];
}

export default function IngredientSection({ categories, ingredients }: IngredientSectionProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const filteredCategories = categories.filter((c) => c.id !== 6);
  const filteredIngredients = ingredients.filter((i) => i.categoryId !== 6);

  const visibleIngredients =
    selectedCategoryId === null
      ? filteredIngredients
      : filteredIngredients.filter((i) => i.categoryId === selectedCategoryId);

  return (
    <section className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full shadow-lg">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search ingredients..."
          className="rounded-full px-6 py-3 text-white outline-none w-64 border-2 border-transparent focus:border-[#A2D135]"
        />
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {filteredCategories.map((category) => (
          <button
            key={category.id}
            onClick={() =>
              setSelectedCategoryId(
                selectedCategoryId === category.id ? null : category.id
              )
            }
            className={`font-bold px-6 py-2 rounded-full ${
              selectedCategoryId === category.id
                ? "bg-white text-black"
                : "bg-[#A2D135] text-black"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {visibleIngredients.map((ingredient) => (
          <IngredientCard key={ingredient.id} ingredient={ingredient} />
        ))}
      </div>
    </section>
  );
}
