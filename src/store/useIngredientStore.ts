import { create } from "zustand";
import type { Ingredient, Bowl, BaseIngredient } from "../types";

interface IngredientStore {
  slots: Record<string, Ingredient | null>;
  baseType: number;
  selectedBowl: Bowl | null;
  selectedBase: BaseIngredient | null;

  setBaseType: (id: number) => void;
  setBowl: (bowl: Bowl) => void;
  setBase: (base: BaseIngredient) => void;

  clearSelection: () => void;

  addIngredient: (item: Ingredient) => void;
  removeIngredient: (id: number) => void;
  clearSlot: (slotKey: string) => void;

  loadRecipe: (params: {
    bowl: Bowl;
    base: BaseIngredient | null;
    slots: Record<string, Ingredient | null>;
    baseType: number;
  }) => void;
}

export const useIngredientStore = create<IngredientStore>((set) => ({
  slots: {},
  baseType: 1,
  selectedBowl: null,
  selectedBase: null,

  setBaseType: (id) => set({ baseType: id }),

  setBowl: (bowl) => set({ selectedBowl: bowl }),

  setBase: (base) => set({ selectedBase: base }),

  clearSelection: () =>
    set({
      slots: {},
      selectedBowl: null,
      selectedBase: null,
    }),

  addIngredient: (item) =>
    set((state) => {
      // base ingredient override
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
  clearSlot: (slotKey) =>
    set((state) => {
      const newSlots = { ...state.slots };
      if (slotKey in newSlots) {
        newSlots[slotKey] = null;
      }
      return { slots: newSlots };
    }),
  loadRecipe: ({ bowl, base, slots, baseType }) =>
    set(() => ({
      selectedBowl: bowl,
      selectedBase: base,
      slots,
      baseType,
    })),
}));