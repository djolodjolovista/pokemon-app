import 'axios'

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    retryRequest?: boolean
  }
}
