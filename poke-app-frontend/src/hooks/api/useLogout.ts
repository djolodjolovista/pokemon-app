import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { logout as apiLogout } from '../../api/authApi'
import { useAuthStore } from '../../store/authStore'

export const useLogout = () => {
  const clearAuth = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  const logout = useCallback(async () => {
    try {
      await apiLogout()
      clearAuth()
      navigate('/login')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Logout failed')
    }
  }, [clearAuth, navigate])

  return logout
}
