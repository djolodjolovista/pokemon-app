import axios, { AxiosError, AxiosHeaders } from 'axios'
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

let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: AxiosError) => void
}> = []

const processQueue = (error: AxiosError | null = null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve(token!)
    }
  })

  failedQueue = []
}

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
  async (error: AxiosError) => {
    const originalRequest = error.config
    if (!originalRequest) return Promise.reject(error)

    const status = error?.response?.status
    const url = originalRequest.url || ''

    // LOGIN and REFRESH are excluded - don't try refresh token
    if (url.includes('/auth/login') || url.includes('/auth/refresh')) {
      return Promise.reject(error)
    }

    if (status === 401 && !originalRequest.retryRequest) {
      originalRequest.retryRequest = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers = AxiosHeaders.from(originalRequest.headers)
            originalRequest.headers.Authorization = `Bearer ${token}`
            return apiClient(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      isRefreshing = true

      try {
        const { accessToken, user } = await refreshAccessToken()

        useAuthStore.getState().login(accessToken, user)

        originalRequest.headers = AxiosHeaders.from(originalRequest.headers)
        originalRequest.headers.Authorization = `Bearer ${accessToken}`

        processQueue(null, accessToken)

        return await apiClient(originalRequest)
      } catch (err) {
        processQueue(err as AxiosError, null)
        useAuthStore.getState().logout()
        throw err
      } finally {
        isRefreshing = false
      }
    }
    if (status === 401) {
      useAuthStore.getState().logout()
      return Promise.reject(error)
    }

    if (status === 403) {
      return Promise.reject(error)
    }

    return Promise.reject(error)
  },
)

export default apiClient
