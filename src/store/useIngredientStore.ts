import { create } from "zustand";
import type { Ingredient, Bowl } from "../types";

interface IngredientStore {
  slots: Record<string, Ingredient | null>;
  baseType: number;
  selectedBowl: Bowl | null;

  setBaseType: (id: number) => void;
  setBowl: (bowl: Bowl) => void;
  clearSelection: () => void;

  addIngredient: (item: Ingredient) => void;
  removeIngredient: (id: number) => void;
}

export const useIngredientStore = create<IngredientStore>((set) => ({
  slots: {},
  baseType: 1,
  selectedBowl: null,

  setBaseType: (id) => set({ baseType: id }),

  setBowl: (bowl) => set({ selectedBowl: bowl }),

 
  clearSelection: () =>
    set({
      slots: {},
      selectedBowl: null,
    }),

  addIngredient: (item) =>
    set((state) => {
      if (item.categoryId === 6) {
        return {
          slots: { ...state.slots, base: item },
        };
      }

      const slotCount = state.selectedBowl?.slot_count;
      if (!slotCount) return state;

      for (let i = 1; i <= slotCount; i++) {
        const key = `slot-${i}`;
        if (!state.slots[key]) {
          return {
            slots: {
              ...state.slots,
              [key]: item,
            },
          };
        }
      }

      return state;
    }),

  removeIngredient: (id) =>
    set((state) => {
      const newSlots = { ...state.slots };

      const keyToRemove = Object.keys(newSlots).find(
        (key) => newSlots[key]?.id === id,
      );

      if (keyToRemove) {
        newSlots[keyToRemove] = null;
      }

      return { slots: newSlots };
    }),
}));