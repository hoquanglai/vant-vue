export interface ApiResponseData<T> {
  status: string
  messages: {
    success?: {
      default?: string
    }
    error?: {
      default?: string
    }
  }
  data: T
}
