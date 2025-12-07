import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Theme } from './theme.enum'

type AppState = {
  theme: Theme
  toggleTheme: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: Theme.Light,
      toggleTheme: () => {
        set((state) => ({ theme: state.theme === Theme.Light ? Theme.Dark : Theme.Light }))
      },
    }),
    {
      name: 'app-settings',
    },
  ),
)
