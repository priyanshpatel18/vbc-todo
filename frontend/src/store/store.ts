import { create } from "zustand";
interface Store {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;

    Category: string;
    setCategory: (state: string) => void;
}

export const Store = create<Store>((set) => ({
    isOpen: false,
    setIsOpen: (state) => set({ isOpen: state }),

    Category: "default",
    setCategory: (state) => set({ Category: state }),
}));
