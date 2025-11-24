import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { ROUTES } from './paths.enum'

const PublicRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to={ROUTES.POKEMON_LIST} replace />
  }

  return <Outlet />
}

export default PublicRoute
