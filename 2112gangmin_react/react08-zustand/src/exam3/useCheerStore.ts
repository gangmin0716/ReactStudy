import { create } from "zustand";

type CheerStore = {
  cheerCount: number;
  addCheer: () => void;
  reset: () => void;
};

const useCheerStore = create<CheerStore>()((set, get) => ({
  cheerCount: 0,
  addCheer() {
    const cheer = get().cheerCount;
    if (cheer < 0) return;
    set({ cheerCount: cheer + 1 });
  },
  reset() {
    set({ cheerCount: 0 });
  },
}));

export default useCheerStore;
