import type { ApiResponseData } from "types/api"

export interface CommunityListDto {
  memberCount: number
  community: CommunityDto
  setting: CommunitySettingDto
}

export interface CommunityDto {
  id: string
  ownerId: string
  createById: string | null
  name: string
  url: string | null
  status: "public" | "unpublic" | string
  packageType: string
  isCreated: boolean
  orderId: string
  expireAt: number
  subscription: string | null
  isPrivate: boolean | null
  createdAt: number
  updatedAt: number
  deletedAt: number | null
}

export interface CommunitySettingDto {
  id: string
  communityId: string
  shortDescription: string | null
  description: string | null
  logoUrl: string | null
  logoPosition: string | null
  faviconLogoUrl: string | null
  emailLogo: string | null
  bannerUrl: string | null
  featureUrl: string | null
  bannerUrlOld: string | null
  featureUrlOld: string | null
  slug: string | null
  supportType: string | null
  eventType: string | null
  pollsAndSurveysType: string | null
  color: string | null
  industries: string | null
  language: string | null
  activeCommunities: string | null
  rules: string | null
  integration: string | null
  professionalType: string
  createdAt: number
  updatedAt: number
  groupChatId: string | null
  memberCount: number
}

export interface JoinedCommunity {
  communityId: string
  memberId: string
  communityName: string | null
  communitySlug: string | null
  joinAt: number | null
  MemberNotifyDto: MemberNotifyDto
  image: string | null
  shortDescription: string | null
  isPrivated: boolean | null
  type: string

}

export interface MemberNotifyDto {
  isSubscribedToNewsletter: boolean | null
  notifySupport: boolean | null
  notifyDocShare: boolean | null
  notifyChat: boolean | null
  notifyPost: boolean | null
  notifyLinkShare: boolean | null
  notifyEvent: boolean | null
  notifyPollAndSurvey: boolean | null
  notifyNews: boolean | null
}

export interface Industry {
  key: string
  description: string
  value: string
  communityCount: number
}

export type CurrentUserResponseData = ApiResponseData<CommunityListDto>
