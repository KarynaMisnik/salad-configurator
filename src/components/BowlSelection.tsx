import type { Bowl } from "../types/index";
import { useIngredientStore } from "../store/useIngredientStore.ts";

type Props = {
  bowls: Bowl[];
};

export default function BowlSelection({ bowls }: Props) {
  const setBowl = useIngredientStore((state) => state.setBowl);
  const selectedBowl = useIngredientStore((state) => state.selectedBowl);
  return (
    <aside className="bg-zinc-800 rounded-[3rem] p-6 text-white  lg:w-1/4 m-4 flex flex-col items-center shadow-lg">
      <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
        1.
      </div>
      <h2 className="text-xl font-bold mb-4">Valitse rasia</h2>

      <div className="w-full flex flex-col gap-3">
        {bowls.map((bowl) => {
          const isActive = selectedBowl && selectedBowl.id === bowl.id;
          return (
            <div key={bowl.id} className="flex justify-center items-center">
              <img
                className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain ${isActive ? 'ring-4 ring-[#A2D135] border-green-600' : ''}`}
                src={bowl.image_url}
                alt={bowl.name}
              />
              <button
                onClick={() => setBowl(bowl)}
                className={`h-12 rounded-xl flex items-center m-2 px-4 border-2 ${isActive ? 'border-[#A2D135] text-[#A2D135] font-bold' : 'border-transparent'}`}
              >
                {bowl.name}
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
