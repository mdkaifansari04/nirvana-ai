import { create } from "zustand";

interface AppStore {
  chatbotId: string;
  setChatbotId: (value: string) => void;
}

const useAppStore = create<AppStore>((set) => ({
  chatbotId: "",
  setChatbotId: (value) => set({ chatbotId: value }),
}));

export default useAppStore;
