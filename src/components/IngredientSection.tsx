export default function IngredientSection() {
  const categories = ["Greens", "Proteins", "Toppings", "Dressings"];

  return (
    <section className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full shadow-lg">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search ingredients..."
          className="rounded-full px-6 py-3 text-white outline-none w-64 border-2 border-transparent focus:border-[#A2D135]"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <span
            key={category}
            className="bg-[#A2D135] text-black font-bold px-6 py-2 rounded-full"
          >
            {category}
          </span>
        ))}
      </div>
    </section>
  );
}
