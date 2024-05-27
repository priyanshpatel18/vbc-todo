import { create } from "zustand";
import apiClient from "../apiClient/apiClient";
import { NavigateFunction } from "react-router-dom";

interface User {
  displayName: string | null;
  email: string | null;
}

export interface Todo {
  _id?: string;
  title: string;
  description: string;
  status?: string;
  dueDate: Date;
  workspaceName: string;
}

interface Store {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;

  isOpen: boolean;
  setIsOpen: (state: boolean) => void;

  category: string;
  setCategory: (state: string) => void;

  user: User | null;
  setUser: (state: User | null) => void;
  getUser: (redirect: NavigateFunction, route: string) => void;

  todos: Todo[];
  setTodos: (state: Todo[]) => void;
}

export const Store = create<Store>((set) => ({
  isLoading: false,
  setIsLoading: (state) => set({ isLoading: state }),

  isOpen: false,
  setIsOpen: (state) => set({ isOpen: state }),

  category: "personal",
  setCategory: (state) => set({ category: state }),

  user: null,
  setUser: (state) => set({ user: state }),
  getUser: async (redirect, route) => {
    Store.getState().setIsLoading(true);

    try {
      await apiClient.get("/user").then(async (res) => {
        if (res.data) {
          Store.getState().setUser(res.data);
          await apiClient.get("/todo").then((res) => {
            Store.getState().setTodos(res.data);
          });
        } else {
          Store.getState().setUser(null);
          redirect(route);
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      Store.getState().setIsLoading(false);
    }
  },

  todos: [],
  setTodos: (state) => set({ todos: state }),
}));
