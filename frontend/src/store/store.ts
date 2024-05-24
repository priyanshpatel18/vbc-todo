import { create } from "zustand";
interface Store {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;

  cateogry: string;
  setCategory: (state: string) => void;
}

export const Store = create<Store>((set) => ({
  isOpen: false,
  setIsOpen: (state) => set({ isOpen: state }),

  cateogry: "personal",
  setCategory: (state) => set({ cateogry: state }),
}));
