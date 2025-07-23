import { ApiResponseData } from "types/api"

export interface LoginRequestData {
  username: "admin" | "editor"
  password: string
}

export type CaptchaResponseData = ApiResponseData<string>

export type LoginResponseData = ApiResponseData<any>
