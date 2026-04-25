import { create } from "zustand";
import type { Ingredient, Bowl, BaseIngredient } from "../types";

interface IngredientStore {
  slots: Record<string, Ingredient | null>;
  baseType: number;
  selectedBowl: Bowl | null;
  selectedBase: BaseIngredient | null;

  highlightStep: number | null;
setHighlightStep: (step: number | null) => void;

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

 
  highlightStep: null,

  setHighlightStep: (step) =>
    set(() => ({
      highlightStep: step,
    })),

  setBaseType: (id) =>
    set(() => ({
      baseType: id,
      selectedBase: null,
      slots: {},
    })),

  setBowl: (bowl: Bowl | null) =>
    set(() => ({
      selectedBowl: bowl,
      selectedBase: null,
      slots: {},
    })),

  setBase: (base: BaseIngredient) =>
    set((state) => {
      const allowed = state.baseType;

      if (!state.selectedBowl) {
        return {
          highlightStep: 1,
        };
      }

      if (base.categoryId !== 6 && base.categoryId !== allowed) {
        return state;
      }

      if (
        state.selectedBowl &&
        state.selectedBowl.base_type_id !== allowed
      ) {
        return state;
      }

      return {
        selectedBase: base,
        highlightStep: null,
      };
    }),

  clearSelection: () =>
    set({
      slots: {},
      selectedBowl: null,
      selectedBase: null,
      highlightStep: null,
    }),

addIngredient: (item) =>
  set((state) => {
    if (!state.selectedBowl) {
      return { highlightStep: 1 };
    }

    const requiresBase = state.selectedBowl.base_type_id === 1;

    
    if (requiresBase && !state.selectedBase) {
      return { highlightStep: 2 };
    }

    const slotCount = state.selectedBowl.slot_count;
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

  clearSlot: (key: string) =>
    set((state) => ({
      slots: {
        ...state.slots,
        [key]: null,
      },
    })),

  loadRecipe: ({ bowl, base, slots, baseType }) =>
    set(() => ({
      selectedBowl: bowl,
      selectedBase: base,
      slots,
      baseType,
    })),
}));