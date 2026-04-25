import type { BaseIngredient } from "../types";
import { useIngredientStore } from "../store/useIngredientStore";
import { useEffect, useRef } from "react";

interface BaseSelectionProps {
  ingredients: BaseIngredient[];
}

export default function BaseSelection({ ingredients }: BaseSelectionProps) {
  const selectedBase = useIngredientStore((state) => state.selectedBase);
  const setBase = useIngredientStore((state) => state.setBase);

  const selectedBowl = useIngredientStore((state) => state.selectedBowl);
  const baseType = useIngredientStore((state) => state.baseType);

  const isDisabled = selectedBowl && selectedBowl.base_type_id !== baseType;
  const highlightStep = useIngredientStore((state) => state.highlightStep);
  const ref = useRef<HTMLDivElement | null>(null);
  const setHighlightStep = useIngredientStore(
    (state) => state.setHighlightStep,
  );
  const requiresBase = selectedBowl?.base_type_id === 1;

  useEffect(() => {
    if (highlightStep === 2 && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });

      setTimeout(() => setHighlightStep(null), 1500);
    }
  }, [highlightStep]);

  return (
    <aside
      ref={ref}
      className={`
    bg-zinc-800 rounded-[3rem] p-6 text-white lg:w-1/4 m-4 flex flex-col items-center shadow-lg
    ${highlightStep === 2 ? "ring-3 ring-[#A2D135] animate-pulse" : ""}
  `}
    >
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
          {ingredients.map((base) => {
            const isActive = selectedBase && selectedBase.id === base.id;

            const disabled = isDisabled && base.categoryId === 6;

            return (
              <div
                key={base.id}
                className={`pb-2 flex items-center justify-between gap-4 transition ${
                  disabled ? "opacity-40 pointer-events-none" : ""
                }`}
              >
                {/* TEXT */}
                <span
                  onClick={() => setBase(base)}
                  className={`cursor-pointer ${
                    isActive ? "text-[#A2D135] font-bold" : "text-white"
                  }`}
                >
                  {base.name}
                </span>

                {/* IMAGE */}
                <div
                  onClick={() => setBase(base)}
                  className={`w-10 h-10 rounded-full overflow-hidden bg-gray-300 flex-shrink-0 border-2 cursor-pointer ${
                    isActive ? "border-[#A2D135]" : "border-transparent"
                  }`}
                >
                  <img
                    src={base.image_url}
                    alt={base.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </aside>
  );
}
