  import type * as CommunityListDto from "./type"
  import { request } from "@/http/axios"

  export function getCommunitiesApi(form: any) {
    return request<CommunityListDto.CurrentUserResponseData>({
      url: "/public/community/list",
      method: "post",
      data: form
    })
  }
