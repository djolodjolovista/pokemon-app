import { handleApiError } from './handleApiError'

export const apiWrapper = async <T>(apiCall: () => Promise<T>): Promise<T> => {
  try {
    return await apiCall()
  } catch (error) {
    handleApiError(error)
    throw error
  }
}
