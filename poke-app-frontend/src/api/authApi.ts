import type { LoginData, LoginResponse } from '../types/types'
import apiClient from './utils/apiClient'
import { apiWrapper } from './utils/apiWrapper'

export const login = async (credentials: LoginData): Promise<LoginResponse> =>
  apiWrapper(async () => {
    const response = await apiClient.post('/auth/login', credentials)
    return response.data.data
  })

export const logout = (): Promise<void> =>
  apiWrapper(async () => {
    await apiClient.post('/auth/logout', {})
  })
