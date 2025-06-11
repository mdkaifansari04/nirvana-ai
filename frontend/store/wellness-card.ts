import { WellnessCard } from "@/data-access/response";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WellnessCardStore {
    wellnessCard: WellnessCard[] | [];
    setWellnessCard: (wellnessCard: WellnessCard[]) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const useWellnessCardStore = create<WellnessCardStore>()(persist((set) => ({
    wellnessCard: [] as WellnessCard[],
    isLoading: false,
    setWellnessCard: (wellnessCard) => set({ wellnessCard }),
    setIsLoading: (isLoading) => set({ isLoading }),
}), {
    name: "wellness-card",
    storage: createJSONStorage(() => localStorage),
}));    