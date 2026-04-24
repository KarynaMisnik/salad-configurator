import type { BaseIngredient } from "../types";
import { useIngredientStore } from "../store/useIngredientStore";

interface BaseSelectionProps {
  ingredients: BaseIngredient[];
}

export default function BaseSelection({ ingredients }: BaseSelectionProps) {
  const selectedBase = useIngredientStore((state) => state.selectedBase);
  const setBase = useIngredientStore((state) => state.setBase);

  return (
    <aside className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 m-4 flex flex-col items-center shadow-lg">
      <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
        2.
      </div>

      <h2 className="text-xl font-bold mb-4">Valitse salaattipohaja</h2>

      <div className="w-full space-y-4">
        {ingredients.map((base) => {
          const isActive = selectedBase?.id === base.id;

          return (
            <button
              key={base.id}
              onClick={() => setBase(base)}
              className={`w-full text-left border-b pb-2 flex justify-between items-center transition ${
                isActive
                  ? "border-[#A2D135] text-[#A2D135]"
                  : "border-gray-600 text-white hover:text-[#A2D135]"
              }`}
            >
              <span>{base.name}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
