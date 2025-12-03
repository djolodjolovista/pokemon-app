import axios, { AxiosHeaders } from 'axios'
import { useAuthStore } from '../../store/authStore'
import { refreshAccessToken } from './tokenService'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Version': '1.0.0',
    'App-Version': '1.0.0',
    Platform: 'web',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken

  const newConfig = { ...config }
  newConfig.headers = AxiosHeaders.from(config.headers)

  if (token) {
    newConfig.headers.Authorization = `Bearer ${token}`
  }

  return newConfig
})

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config
    if (!originalRequest) return Promise.reject(error)

    const status = error?.response?.status
    const url = originalRequest.url || ''

    // 🚫 1) LOGIN and REFRESH are excluded - don't try refresh token
    if (url.includes('/auth/login') || url.includes('/auth/refresh')) {
      return Promise.reject(error)
    }

    if (status === 401 && !originalRequest.retryRequest) {
      originalRequest.retryRequest = true

      try {
        const { accessToken, user } = await refreshAccessToken()

        useAuthStore.getState().login(accessToken, user)

        originalRequest.headers.Authorization = `Bearer ${accessToken}`

        return await apiClient(originalRequest)
      } catch (err) {
        setTimeout(() => {
          useAuthStore.getState().logout()
          window.location.href = '/login'
        }, 2000)

        return Promise.reject(err)
      }
    }

    if (status === 401) {
      setTimeout(() => {
        useAuthStore.getState().logout()
        window.location.href = '/login'
      }, 10000)
    }

    if (status === 403) {
      setTimeout(() => {
        useAuthStore.getState().logout()
        window.location.href = '/login'
      }, 10000)
      return Promise.reject(error)
    }

    return Promise.reject(error)
  },
)

export default apiClient
