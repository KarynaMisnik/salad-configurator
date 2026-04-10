import type { Ingredient } from '../types';
import { useIngredientStore } from '../store/useIngredientStore';
// Type-only import keeps runtime bundle clean with strict TS module settings.

interface Props {
  ingredient: Ingredient;
}

export default function IngredientCard({ ingredient }: Props) {
  const addIngredient = useIngredientStore(
    (state: ReturnType<typeof useIngredientStore.getState>) =>
      state.addIngredient
  );

  // Badge color map keyed by diet code from API data.
  const dietColors: Record<string, string> = {
    G: 'bg-green-100 text-green-800',
    L: 'bg-amber-100 text-amber-800',
    V: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        onClick={() => addIngredient(ingredient)}
        className="w-40 h-40 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col p-4 text-left"
      >
        {/* Image */}
        <div className="w-full h-24 bg-gray-200 rounded mb-3 flex items-center justify-center overflow-hidden">
          <img
            src={ingredient.image_url}
            alt={ingredient.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <h3 className="text-sm font-semibold text-gray-800 truncate mb-2">
          {ingredient.name}
        </h3>

        {/* Diet Tags */}
        <div className="flex flex-wrap gap-1 mt-auto">
          {ingredient.diets.map((diet) => (
            <span
              key={diet}
              // Unknown diet code falls back to neutral styling.
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                dietColors[diet] || 'bg-gray-100 text-gray-800'
              }`}
            >
              {diet}
            </span>
          ))}
        </div>
      </button>
    </div>
  );
}
