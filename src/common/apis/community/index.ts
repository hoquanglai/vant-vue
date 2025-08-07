import type * as CommunityListDto from "./type"
import { request } from "@/http/axios"

export function getCommunitiesApi(form: any) {
  return request<CommunityListDto.CurrentUserResponseData>({
    url: "/public/community/list",
    method: "post",
    data: form
  })
}

export function getIndustry() {
  return request<CommunityListDto.CurrentUserResponseData>({
    url: "/public/industries/list",
    method: "post"
  })
}

export function getMyCommunity() {
  return request<CommunityListDto.CurrentUserResponseData>({
    url: "/api/community/my-community",
    method: "post"
  })
}

export function getJoinedCommunity() {
  return request<CommunityListDto.CurrentUserResponseData>({
    url: "/api/member/my-community-joined",
    method: "post"
  })
}
