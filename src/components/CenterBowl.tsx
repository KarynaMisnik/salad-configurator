import { useIngredientStore } from "../store/useIngredientStore.ts";

const setBaseType = useIngredientStore((state) => state.setBaseType);

export default function CenterBowl() {
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
        <span className="text-gray-400">Bowl</span>
      </div>
      <div className="mt-4 text-center text-gray-700">
        <p>100 g / 1,99 €</p>
        <p>500 ml</p>
      </div>
    </div>
  );
}
