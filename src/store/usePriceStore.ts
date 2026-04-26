import { create } from "zustand";
import type { PriceListItem } from "../types";
import { getPrices } from "../services/api";

interface PriceStore {
	prices: PriceListItem[];
	setPrices: (prices: PriceListItem[]) => void;
	fetchPrices: (token: string) => Promise<void>;
}

export const usePriceStore = create<PriceStore>((set) => ({
	prices: [],
	setPrices: (prices) => set({ prices }),
	fetchPrices: async (token: string) => {
		const prices = await getPrices(token);
		set({ prices });
	},
}));

