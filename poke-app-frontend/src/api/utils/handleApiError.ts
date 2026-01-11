import { isAxiosError, type AxiosError } from 'axios'
import { toast } from 'react-hot-toast'

export const handleApiError = (error: unknown) => {
  const axiosError = error as AxiosError<{ message?: string }>
  if (isAxiosError(error)) {
    const message = axiosError?.response?.data?.message || axiosError.message || 'Request failed!'

    toast.error(message)

    return message
  }
  if (error instanceof Error) {
    toast.error(error.message)
    return error.message
  }
  const fallbackMessage = 'An unknown error occurred'
  toast.error(fallbackMessage)
  return fallbackMessage
}
