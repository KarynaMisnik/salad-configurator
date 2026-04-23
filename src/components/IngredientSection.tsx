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
  const [activeDiet, setActiveDiet] = useState<string | null>(null);

  const filteredIngredients = ingredients.filter((ingredient) => {
    const matchesCategory =
      activeCategory === null || ingredient.categoryId === activeCategory;

    const matchesSearch = ingredient.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesDiet = !activeDiet || ingredient.diets.includes(activeDiet);

    return matchesCategory && matchesSearch && matchesDiet;
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
          <span className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-black font-bold">
            3.
          </span>
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
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-6 py-2 rounded-full font-bold ${
              activeCategory === null
                ? "bg-white text-black"
                : "bg-gray-500 text-white"
            }`}
          >
            Kaikki
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-bold ${
                activeCategory === category.id
                  ? "bg-white text-black"
                  : "bg-[#A2D135] text-black"
              }`}
            >
              {category.name}
            </button>
          ))}
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
      <div className="flex flex-wrap gap-3 mt-6 justify-center">
        {diets.map((diet) => (
          <button
            key={diet.code}
            onClick={() => setActiveDiet(diet.code)}
            className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium"
          >
            {/* CIRCLE */}
            <span
              className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold ${
                activeDiet === diet.code
                  ? "bg-[#A2D135]  text-black"
                  : "bg-[#A2D135] text-black"
              }`}
            >
              {/* STYLE ONACTIVE ???*/}
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
