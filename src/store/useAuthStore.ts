import { create } from "zustand";

interface AuthStore {
  token: string | null;
  userName: string | null;

  login: (token: string, userName: string) => void;
  logout: () => void;
}

// 🔹 Helper: read from localStorage safely
const getInitialAuth = () => {
  return {
    token: localStorage.getItem("token"),
    userName: localStorage.getItem("userName"),
  };
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...getInitialAuth(),

  login: (token, userName) => {
    // save to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);

    // update state
    set({ token, userName });
  },

  logout: () => {
    // clear storage
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    // reset state
    set({ token: null, userName: null });
  },
}));
