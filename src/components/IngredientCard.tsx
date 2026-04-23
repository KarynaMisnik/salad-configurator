import type { Ingredient } from "../types";
import { useIngredientStore } from "../store/useIngredientStore";
// Type-only import keeps runtime bundle clean with strict TS module settings.

interface Props {
  ingredient: Ingredient;
}

export default function IngredientCard({ ingredient }: Props) {
  const addIngredient = useIngredientStore(
    (state: ReturnType<typeof useIngredientStore.getState>) =>
      state.addIngredient,
  );

  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        onClick={() => addIngredient(ingredient)}
        className="w-60 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-3"
      >
        {/* Image */}
        <div className="w-12 h-12 flex-shrink-0 rounded overflow-hidden bg-gray-200">
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
      </button>
    </div>
  );
}
