import { create } from "zustand";
type CountStore = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

const useCountStore = create<CountStore>()((set, get) => ({
  count: 0,
  increment() {
    const current = get().count;
    if (current >= 10) return;
    set({ count: current + 1 });
  },
  decrement() {
    const current = get().count;
    if (current <= 0) return;
    set({ count: current - 1 });
  },
  reset() {
    set({ count: 0 });
  },
}));

export default useCountStore;
