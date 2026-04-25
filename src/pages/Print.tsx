
import CenterBowl from "../components/CenterBowl";
import { useIngredientStore } from "../store/useIngredientStore";
import type { Ingredient } from "../types";

function Print() {
  const slots = useIngredientStore((state) => state.slots);
  const selectedBowl = useIngredientStore((state) => state.selectedBowl);
  const slotEntries = Object.entries(slots).filter(
    ([key, value]) => key !== "base" && value !== null
  ) as [string, Ingredient][];
  const activeIngredients = slotEntries.map(([_, ingredient]) => ingredient);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
      {/* Print button (hidden in print) */}
      <button
        onClick={() => window.print()}
        className="mb-8 px-6 py-2 rounded-full bg-[#A2D135] text-black font-bold shadow print:hidden"
      >
        Print Receipt
      </button>

      {/* Bowl visual (centered, large) */}
      <div className="w-full flex justify-center mb-8">
        <div className="print:shadow-none print:border-none print:bg-white">
          <CenterBowl />
        </div>
      </div>

      {/* Ingredient list summary */}
      <div className="w-full max-w-md print:max-w-full print:mx-0 mx-auto bg-white rounded-xl shadow p-6 print:shadow-none print:border-none">
        <h2 className="text-2xl font-bold mb-4 text-center print:text-black">Ingredients</h2>
        <ul className="divide-y divide-gray-200 print:divide-black">
          {activeIngredients.map((ingredient) => (
            <li key={ingredient.id} className="py-2 text-lg print:text-black">
              {ingredient.name}
            </li>
          ))}
        </ul>
        {selectedBowl && (
          <div className="mt-6 text-center text-gray-700 print:text-black">
            <div className="font-semibold">Bowl: {selectedBowl.name}</div>
            <div>Volume: {selectedBowl.volume} ml</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Print;
