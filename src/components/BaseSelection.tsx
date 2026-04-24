import type { BaseIngredient } from "../types";
import { useIngredientStore } from "../store/useIngredientStore";

interface BaseSelectionProps {
  ingredients: BaseIngredient[];
}

export default function BaseSelection({ ingredients }: BaseSelectionProps) {
  return (
    <aside className="bg-zinc-800 rounded-[3rem] p-6 text-white  lg:w-1/4 m-4 flex flex-col items-center shadow-lg">
      <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
        2.
      </div>

      <h2 className="text-xl font-bold mb-4">Valitse salaattipohja</h2>

      {/* EMPTY STATE */}
      {ingredients.length === 0 ? (
        <p className="text-gray-400 text-sm text-center mt-4">
          Ei saatavilla olevaa pohjaa tälle valinnalle
        </p>
      ) : (
        <div className="w-full space-y-4">
          {ingredients.map((base) => (
            <div
              key={base.id}
              className="pb-2 flex items-center justify-between gap-4"
            >
              <span className="text-white">{base.name}</span>

              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                <img
                  src={base.image_url}
                  alt={base.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
