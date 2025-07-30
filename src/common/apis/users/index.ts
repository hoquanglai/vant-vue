import type * as Users from "./type"
import { request } from "@/http/axios"

export function getCurrentUserApi() {
  return request<Users.CurrentUserResponseData>({
    url: "/api/cam-session-user/details",
    method: "post"
  })
}
