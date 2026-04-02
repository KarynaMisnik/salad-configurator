import type { Bowl } from "../types/index";
import { useIngredientStore } from "../store/useIngredientStore.ts";

type Props = {
  bowls: Bowl[];
};

const setBowl = useIngredientStore((state) => state.setBowl);

export default function BowlSelection({ bowls }: Props) {
  return (
    <aside className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 ml-4 mt-4 flex flex-col items-center shadow-lg">
      <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
        1
      </div>
      <h2 className="text-xl font-bold mb-4">Valitse rasia</h2>

      <div className="w-full flex flex-col gap-3">
        {bowls.map((bowl) => (
          <div key={bowl.id} className="flex">
            <img src={bowl.image_url}></img>
            <button
              onClick={() => setBowl(bowl)}
              className="h-12 border-2 border-gray-600 rounded-xl flex items-center px-4"
            >
              {bowl.name}
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}
