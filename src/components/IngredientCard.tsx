import type { Ingredient } from "../types";
import { useIngredientStore } from "../store/useIngredientStore";
import { useAuthStore } from "../store/useAuthStore";
import { usePriceStore } from "../store/usePriceStore";

interface Props {
  ingredient: Ingredient;
}

export default function IngredientCard({ ingredient }: Props) {
  const addIngredient = useIngredientStore(
    (state: ReturnType<typeof useIngredientStore.getState>) => state.addIngredient
  );
  const { token } = useAuthStore();
  const prices = usePriceStore((state) => state.prices);
  const priceItem = prices.find((p) => p.item_id === ingredient.id);

  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={() => addIngredient(ingredient)}
        className="relative w-60 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-3 p-2 active:scale-95 transition-transform duration-100"
      >
        <div className="absolute top-1 right-1 flex gap-1">
          {ingredient.diets.map((diet) => (
            <span
              key={diet}
              className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#A2D135] text-black font-bold"
            >
              {diet}
            </span>
          ))}
        </div>

        {/* Image */}
        <div className="w-12 h-12 m-0 flex-shrink-0 rounded overflow-hidden bg-gray-200">
          <img
            src={ingredient.image_url}
            alt={ingredient.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <h3 className="text-sm font-semibold text-gray-800 leading-tight break-words flex-1">
          {ingredient.name}
        </h3>
        {/* Price */}
        <div className="ml-auto text-xs font-semibold text-gray-600">
          {token
            ? priceItem
              ? `+ ${priceItem.price.toFixed(2)} €`
              : ""
            : "Login to see price"}
        </div>
      </button>
    </div>
  );
}
