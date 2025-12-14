import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ROUTES } from './paths.enum'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import MainLayout from '../layouts/MainLayout'

const LoginPage = lazy(() => import('../pages/login/LoginPage'))
const PokemonListPage = lazy(() => import('../pages/pokemon-list/PokemonListPage'))
const PokemonDetailsPage = lazy(() => import('../pages/pokemon-details/PokemonDetailsPage'))
const LocationsPage = lazy(() => import('../pages/locations/LocationsPage'))

const suspenseWrapper = (element: React.ReactNode) => (
  <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
)

const router = createBrowserRouter([
  {
    path: '',
    element: <PublicRoute />,
    children: [
      {
        path: '/',
        element: <Navigate to={ROUTES.LOGIN} replace />,
      },
      {
        path: ROUTES.LOGIN,
        element: suspenseWrapper(<LoginPage />),
      },
    ],
  },
  {
    path: '',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <MainLayout />,
        children: [
          {
            path: ROUTES.POKEMON_LIST,
            element: suspenseWrapper(<PokemonListPage />),
          },
          {
            path: ROUTES.POKEMON_DETAIL,
            element: suspenseWrapper(<PokemonDetailsPage />),
          },
          {
            path: ROUTES.LOCATIONS,
            element: suspenseWrapper(<LocationsPage />),
          },
        ],
      },
    ],
  },
])

export const AppRouter = () => <RouterProvider router={router} />
