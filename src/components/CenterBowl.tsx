import { useIngredientStore } from "../store/useIngredientStore";
import { useLocation } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function CenterBowl() {
  const setBaseType = useIngredientStore((state) => state.setBaseType);
  const slots = useIngredientStore((state) => state.slots);
  const selectedBowl = useIngredientStore((state) => state.selectedBowl);
  const selectedBase = useIngredientStore((state) => state.selectedBase);
  const clearSlot = useIngredientStore((state) => state.clearSlot);

  const location = useLocation();

  const slotCount = selectedBowl?.slot_count ?? 0;

  const slotsArray = Array.from({ length: slotCount }, (_, i) => {
    const key = `slot-${i + 1}`;
    return { key, item: slots[key] };
  });

  const dividerImage =
    selectedBowl?.slot_count === 6
      ? "https://www.cc.puv.fi/~asa/fresh/images/jakaja_6_lohkoa.png"
      : selectedBowl?.slot_count === 4
        ? "https://www.cc.puv.fi/~asa/fresh/images/jakaja_4_lohkoa.png"
        : null;

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] mt-4 lg:mt-0">
      {/* SWITCH */}
      {location.pathname !== "/print" && (
        <div className="flex gap-3 mb-6 mt-4 items-center">
          <button
            onClick={() => setBaseType(1)}
            className="px-6 py-2 rounded-full bg-[#A2D135] text-black border border-green-700 hover:border-green-900 transition"
          >
            Salaatti
          </button>

          <button
            onClick={() => setBaseType(2)}
            className="px-6 py-2 rounded-full bg-[#A2D135] text-black border border-green-700 hover:border-green-900 transition"
          >
            Rahka
          </button>
        </div>
      )}

      {/* BOWL */}
      <div className="relative w-80 h-80 rounded-full overflow-hidden flex items-center justify-center">
        {/* BOWL IMAGE */}
        {selectedBowl ? (
          <img
            src={selectedBowl.image_url}
            alt={selectedBowl.name}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        ) : (
          <span className="text-gray-400 z-10">Valitse rasia</span>
        )}

        {/* BASE */}
        {selectedBase && (
          <img
            src={selectedBase.image_url}
            alt={selectedBase.name}
            className="absolute inset-0 w-full h-full object-cover z-10"
          />
        )}

        {/* DIVIDER */}
        {dividerImage && (
          <img
            src={dividerImage}
            alt="divider"
            className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
          />
        )}

        {/* INGREDIENT SLOTS (WEDGES) */}
        <div className="absolute inset-0 z-30">
          {slotsArray.map(({ key, item }, index) => {
            if (!item) return null;

            const angleStep = 360 / slotCount;
            const rotation = index * angleStep;

            return (
              <div
                key={key}
                className="absolute w-full h-full flex items-center justify-center pointer-events-none"
                style={{
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                {/* slice content */}
                <div
                  className="relative w-2/5 h-1/2 flex items-center justify-center pointer-events-auto"
                  style={{
                    transform: `translateY(-40%)`,
                  }}
                >
                  <img
                    src={item.wedge_image_url}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />

                  <button
                    onClick={() => clearSlot(key)}
                    className="absolute top-1 right-1 bg-black text-white rounded-full w-6 h-6 text-xs z-50 hover:bg-red-400"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
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
