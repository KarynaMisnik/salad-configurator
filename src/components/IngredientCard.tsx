import type { Ingredient } from '../types';
// ^^ required a type only import when erbatimModuleSyntax is enabled

interface Props {
  ingredient: Ingredient;
}

export default function IngredientCard({ ingredient }: Props) {
  const dietColors: Record<string, string> = {
    G: 'bg-green-100 text-green-800',
    L: 'bg-amber-100 text-amber-800',
    V: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-40 h-40 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col p-4">
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
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                dietColors[diet] || 'bg-gray-100 text-gray-800'
              }`}
            >
              {diet}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
