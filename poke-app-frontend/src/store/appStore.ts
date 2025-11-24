import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Theme } from "./theme.enum";

type AppState = {
  theme: Theme;
  toggleTheme: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: Theme.Light,
      toggleTheme: () => {
        const current = get().theme;
        set({ theme: current === Theme.Light ? Theme.Dark : Theme.Light });
      },
    }),
    {
      name: "app-settings",
    }
  )
);
