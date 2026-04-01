import type { Ingredient } from "../types/index";

interface BaseSelectionProps {
  ingredients: Ingredient[];
}

export default function BaseSelection({ ingredients }: BaseSelectionProps) {
  // Category 6 is reserved for base ingredients (e.g., rice/greens).
  const bases = ingredients.filter((ingredient) => ingredient.categoryId === 6);

  return (
    <div
      className="bg-zinc-800 rounded-[3rem] p-6 text-white
     w-full lg:w-1/4 flex flex-col items-center shadow-lg"
    >
      <div
        className="w-10 h-10 rounded-full bg-gray-700 
        flex items-center justify-center mb-4"
      >
        2
      </div>
      <div className="w-full space-y-4">
        {bases.map((base) => (
          <div
            key={base.id}
            className="border-b border-gray-600 pb-2
          flex justify-end gap-4 items-center"
          >
            <span className="text-red-500">{base.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
