
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (username, password) => {
    if (username === "Solomon" && password === "Lane") {
      set({ isAuthenticated: true, user: username });
      return true;
    }
    return false;
  },
  logout: () => set({ isAuthenticated: false, user: null })
}));
