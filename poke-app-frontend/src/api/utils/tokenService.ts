import axios from 'axios'
import type { LoginResponse } from '../../types/types'
import { apiWrapper } from './apiWrapper'

export const refreshAccessToken = (): Promise<LoginResponse> =>
  apiWrapper(async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
      {},
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      },
    )
    return res.data.data
  })
