import { useIngredientStore } from "../store/useIngredientStore.ts";

export default function CenterBowl() {
  const setBaseType = useIngredientStore((state) => state.setBaseType);
  const slots = useIngredientStore((state) => state.slots);
  const activeIngredients = Object.values(slots).filter((i) => i !== null);
  const selectedBowl = useIngredientStore((state) => state.selectedBowl);

  return (
    <div
      className="flex-1 flex flex-col 
      items-center justify-center min-h-[400px] mt-4 lg:mt-0"
    >
      <div className="flex gap-3 mb-6 items-center">
        <button onClick={() => setBaseType(1)}>Salaatti</button>
        <button onClick={() => setBaseType(2)}>Rahka</button>
      </div>
      <div
        className="w-80 h-80 rounded-full border-[12px] border-gray-200
       bg-gray-50 flex items-center justify-center shadow-inner relative"
      >
        <div
          className="w-80 h-80 rounded-full border-[12px] border-gray-200
  bg-gray-50 flex flex-wrap items-center justify-center gap-2
  shadow-inner relative p-4"
        >
          {activeIngredients.length === 0 ? (
            <span className="text-gray-400">Bowl</span>
          ) : (
            activeIngredients.map((ingredient) => (
              <span
                key={ingredient.id}
                className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm"
              >
                {ingredient.name}
              </span>
            ))
          )}
        </div>
      </div>
      <div className="mt-4 text-center text-gray-700">
        <p>100 g / 1,99 €</p>
        <p>{selectedBowl ? selectedBowl.volume : 0}</p>
      </div>
    </div>
  );
}
