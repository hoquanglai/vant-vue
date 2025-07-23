import type { AxiosInstance, AxiosRequestConfig } from "axios"
import { getToken } from "@@/utils/cache/cookies"
import axios from "axios"
import { get, merge } from "lodash-es"
import { useUserStore } from "@/pinia/stores/user"

/** Logout and force refresh the page (will redirect to login page) */
function logout() {
  useUserStore().resetToken()
  location.reload()
}

/** Create Axios instance */
function createInstance() {
  // Create an axios instance named "instance"
  const instance = axios.create()

  // Request interceptor
  instance.interceptors.request.use(
    // Before sending request
    config => config,
    // Request error
    error => Promise.reject(error)
  )

  // Response interceptor (adjust logic according to business needs)
  instance.interceptors.response.use(
    (response) => {
      // apiData is the data returned by API
      const apiData = response.data

      // If it's binary data, return it directly
      const responseType = response.request?.responseType
      if (responseType === "blob" || responseType === "arraybuffer") return apiData

      // "code" is the business code agreed with backend
      const code = apiData.code

      // If there's no code, this API is not from our backend

      if (code !== undefined) {
        switch (code) {
          case 0:
            return apiData
          case 401:
            return logout()
          default:
            return Promise.reject(new Error(apiData.message || "Error"))
        }
      }
      if (apiData.status === "success") {
        return apiData
      }
    },
    (error) => {
      // "status" is the HTTP status code
      const status = get(error, "response.status")
      const message = get(error, "response.data.message")

      switch (status) {
        case 400:
          error.message = "Bad Request"
          break
        case 401:
          // Session expired
          error.message = message || "Unauthorized"
          logout()
          break
        case 403:
          error.message = message || "Forbidden"
          break
        case 404:
          error.message = "Not Found"
          break
        case 408:
          error.message = "Request Timeout"
          break
        case 500:
          error.message = "Internal Server Error"
          break
        case 501:
          error.message = "Not Implemented"
          break
        case 502:
          error.message = "Bad Gateway"
          break
        case 503:
          error.message = "Service Unavailable"
          break
        case 504:
          error.message = "Gateway Timeout"
          break
        case 505:
          error.message = "HTTP Version Not Supported"
          break
      }
      return Promise.reject(error)
    }
  )
  return instance
}

/** Create request method */
function createRequest(instance: AxiosInstance) {
  return <T>(config: AxiosRequestConfig): Promise<T> => {
    const token = getToken()
    // Default configuration
    const defaultConfig: AxiosRequestConfig = {
      // API base URL
      baseURL: import.meta.env.VITE_BASE_URL,
      // Request headers
      headers: {
        // Attach Token
        // "Authorization": token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      withCredentials: true,
      // Request body
      data: {},
      // Timeout
      timeout: 5000,
    }
    // Merge defaultConfig and custom config into mergeConfig
    const mergeConfig = merge(defaultConfig, config)
    return instance(mergeConfig)
  }
}

/** Axios instance for requests */
const instance = createInstance()

/** Request function */
export const request = createRequest(instance)
