import { create } from 'zustand'
import type { User } from '../types/types'
import { refreshAccessToken } from '../api/utils/tokenService'

interface AuthState {
  isAuthenticated: boolean
  initialized: boolean
  user: User | null
  accessToken: string | null
  loading: boolean
  login: (accessToken: string, user: User) => void
  logout: (callback?: () => void) => void
  checkSession: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  initialized: false,
  loading: true,

  login: (accessToken, user) => set({ accessToken, user, isAuthenticated: true }),
  logout: (callback) => {
    set({ isAuthenticated: false, user: null, accessToken: null })
    if (callback) callback()
  },
  checkSession: async () => {
    try {
      const newToken = await refreshAccessToken()
      set({
        accessToken: newToken.accessToken,
        loading: false,
        isAuthenticated: true,
        user: newToken.user,
        initialized: true,
      })
    } catch {
      set({
        accessToken: null,
        loading: false,
        isAuthenticated: false,
        user: null,
        initialized: true,
      })
    }
  },
}))
