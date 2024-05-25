import { create } from "zustand";
interface Store {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;

  isOpen: boolean;
  setIsOpen: (state: boolean) => void;

  cateogry: string;
  setCategory: (state: string) => void;
}

export const Store = create<Store>((set) => ({
  isLoading: false,
  setIsLoading: (state) => set({ isLoading: state }),

  isOpen: false,
  setIsOpen: (state) => set({ isOpen: state }),

  cateogry: "personal",
  setCategory: (state) => set({ cateogry: state }),
}));
