import type { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'

export const handleApiError = (error: unknown) => {
  const axiosError = error as AxiosError<{ message?: string }>

  const message =
    axiosError?.response?.data?.message ||
    (error instanceof Error ? error.message : 'Unexpected error')

  toast.error(message)

  return message
}
