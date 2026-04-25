import { useState } from "react";
import type { Category, Ingredient } from "../types";
import IngredientCard from "./IngredientCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface IngredientSectionProps {
  categories: Category[];
  ingredients: Ingredient[];
}

export default function IngredientSection({
  categories,
  ingredients,
}: IngredientSectionProps) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIngredients = ingredients.filter((ingredient) => {
    const matchesCategory =
      activeCategory === null || ingredient.categoryId === activeCategory;

    const matchesSearch = ingredient.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const diets = [
    { code: "G", label: "gluteeniton" },
    { code: "L", label: "laktoositon" },
    { code: "VL", label: "vähälaktoositon" },
    { code: "V", label: "vegaaninen" },
  ];

  return (
    <section className="bg-zinc-800 rounded-[3rem] m-4 p-8 text-white  shadow-lg">
      <div className="flex flex-col items-center text-center mb-6 md:mb-0  ">
        <h1 className="flex items-center gap-4 text-xl font-semibold">
          <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
            3.
          </div>
          Lisää raaka-aineet
        </h1>
      </div>
      {/* SEARCH */}
      <div className="flex flex-col md:flex-row m-2 sm:m-4 md:m-6 lg:m-8">
        <div className="relative mr-4 flex items-center mb-6 ">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 h-10 pl-10 pr-4 rounded-full bg-gray-100 text-black placeholder-gray-400 flex items-center leading-none focus:outline-none focus:ring-2 focus:ring-[#A2D135]"
          />
        </div>

        {/* CATEGORY BUTTONS */}
        <div className="flex flex-wrap gap-3 mb-6">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full font-bold transition-colors duration-150 border-2 focus:outline-none focus:ring-2 focus:ring-[#A2D135] ${
                  isActive
                    ? "bg-white text-[#A2D135] border-[#A2D135] shadow-lg scale-105" // highlighted style
                    : "bg-[#A2D135] text-black border-transparent hover:bg-white hover:text-[#A2D135] hover:border-[#A2D135]"
                }`}
                style={{
                  boxShadow: isActive
                    ? "0 4px 16px 0 rgba(162, 209, 53, 0.15)"
                    : undefined,
                }}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* INGREDIENT CARDS */}
      <div className="flex flex-wrap gap-4">
        {filteredIngredients.length === 0 ? (
          <p className="text-gray-300">Select a category to see ingredients</p>
        ) : (
          filteredIngredients.map((ingredient) => (
            <IngredientCard key={ingredient.id} ingredient={ingredient} />
          ))
        )}
      </div>

      {/* DIET BUTTONS */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6 items-start sm:items-center justify-start sm:justify-center">
        {diets.map((diet) => (
          <button
            key={diet.code}
            className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium"
          >
            {/* CIRCLE */}
            <span className="w-7 h-7 bg-[#A2D135] text-black flex items-center justify-center rounded-full text-xs font-bold">
              {diet.code}
            </span>

            {/* LABEL */}
            <span className="text-white">{diet.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
