import axios from 'axios'
import type { LoginResponse } from '../../types/types'

export const refreshAccessToken = async (): Promise<LoginResponse> => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
    {},
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    },
  )
  return res.data.data
}
