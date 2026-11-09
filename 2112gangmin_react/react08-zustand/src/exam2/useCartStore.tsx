import { create } from "zustand";

type CartStore = {
  count: number;
  addItem: () => void;
  removeItem: () => void;
  resetCart: () => void;
};

const useCartStore = create<CartStore>()((set, get) => ({
  count: 0,
  addItem() {
    const current = get().count;
    if (current < 0) return;
    set({ count: current + 1 });
  },
  removeItem() {
    const current = get().count;
    if (current <= 0) return;
    set({ count: current - 1 });
  },
  resetCart() {
    set({ count: 0 });
  },
}));

export default useCartStore;
