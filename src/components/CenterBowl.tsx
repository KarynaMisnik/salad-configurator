import { useIngredientStore } from "../store/useIngredientStore";

export default function CenterBowl() {
  const setBaseType = useIngredientStore((state) => state.setBaseType);
  const slots = useIngredientStore((state) => state.slots);
  const selectedBowl = useIngredientStore((state) => state.selectedBowl);
  const baseType = useIngredientStore((state) => state.baseType);

  const base = slots.base;

  const activeIngredients = Object.entries(slots)
    .filter(([key, value]) => key !== "base" && value !== null)
    .map(([_, value]) => value);

  const dividerImage =
    selectedBowl?.slot_count === 6
      ? "https://www.cc.puv.fi/~asa/fresh/images/jakaja_6_lohkoa.png"
      : selectedBowl?.slot_count === 4
        ? "https://www.cc.puv.fi/~asa/fresh/images/jakaja_4_lohkoa.png"
        : null;

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] mt-4 lg:mt-0">
      {/* SWITCH */}
      <div className="flex gap-3 mb-6 items-center">
        <button
          onClick={() => setBaseType(1)}
          className="px-6 py-2 rounded-full bg-[#A2D135] text-black border border-green-700 hover:border-3 hover:border-solid hover:border-green-700 transition"
        >
          Salaatti
        </button>

        <button
          onClick={() => setBaseType(2)}
          className="px-6 py-2 rounded-full bg-[#A2D135] text-black border border-green-700 hover:border-3 hover:border-solid hover:border-green-700 transition"
        >
          Rahka
        </button>
      </div>

      {/* BOWL */}
      <div className="relative w-80 h-80  overflow-hidden flex items-center justify-center">
        {/* 1. BOWL IMAGE (main layer) */}
        {selectedBowl ? (
          <img
            src={selectedBowl.image_url}
            alt={selectedBowl.name}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        ) : (
          <span className="text-gray-400 z-10">Valitse rasia</span>
        )}

        {/* 2. BASE */}
        {base && (
          <img
            src={base.image_url}
            alt="base"
            className="absolute inset-0 w-full h-full object-cover z-10"
          />
        )}

        {/* 3. DIVIDER */}
        {selectedBowl && dividerImage && (
          <img
            src={dividerImage}
            alt="divider"
            className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
          />
        )}

        {/* 4. INGREDIENTS */}
        <div className="relative z-30 flex flex-wrap items-center justify-center gap-2 p-4 h-full">
          {activeIngredients.length > 0 &&
            activeIngredients.map((ingredient) => {
              if (!ingredient) return null;

              return (
                <span
                  key={ingredient.id}
                  className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm"
                >
                  {ingredient.name}
                </span>
              );
            })}
        </div>
      </div>

      {/* INFO */}
      <div className="mt-4 text-gray-700 flex justify-between w-full px-4">
        <p>100 g / 1,99 €</p>
        <p>{selectedBowl ? selectedBowl.volume : 0} ml</p>
      </div>
    </div>
  );
}
