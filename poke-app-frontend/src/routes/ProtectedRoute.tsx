import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from './paths.enum'
import { useAuthStore } from '../store/authStore'
import MoonSpinner from '../components/spinners/MoonSpinner'

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuthStore()

  const checkSession = useAuthStore((s) => s.checkSession)

  useEffect(() => {
    checkSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <MoonSpinner size={60} position="center" />
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
