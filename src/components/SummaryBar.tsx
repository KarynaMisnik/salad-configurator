import { Link } from "react-router-dom";
import { useIngredientStore } from "../store/useIngredientStore";
import type { Ingredient } from "../types";

export default function SummaryBar() {
  const slots = useIngredientStore((state) => state.slots);

  const removeIngredient = useIngredientStore(
    (state) => state.removeIngredient,
  );
  const activeIngredients = Object.values(slots).filter(
    (i): i is Ingredient => i !== null,
  );

  return (
    <section className="bg-zinc-800 rounded-[3rem] p-8 ml-4 mr-4 text-white w-full flex flex-col md:flex-row gap-8 shadow-xl">
      Summry Bar
      <div className="flex-1 bg-[#3a3a3a] rounded-3xl p-6 min-h-[150px] shadow-inner">
        <h3 className="text-xl text-white font-bold mb-4">
          Selected ingredients ({activeIngredients.length})
        </h3>
        <ul className="space-y-2 text-sm">
          {activeIngredients.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 bg-zinc-700/70 rounded-lg px-3 py-2"
            >
              <span>{item.name}</span>
              <button
                type="button"
                onClick={() => removeIngredient(item.id)}
                aria-label={`Remove ${item.name}`}
                className="w-5 h-5 rounded-full bg-zinc-500 hover:bg-zinc-400 text-white text-xs leading-none"
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
      <aside className="flex-1 flex flex-col justify-center items-center gap-6">
        <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
          430g
        </div>
        <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
          $10.99
        </div>
      </aside>
      <Link to="/print">Print</Link>
    </section>
  );
}
