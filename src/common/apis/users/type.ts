import { ApiResponseData } from "types/api"

export interface CurrentUserDto {
  accountId: string
  userId: string
  user: {
    id: string
    username: string
    email: string
    firstName: string
    lastName: string
    fullName: string
    displayName: string
    normalizedName: string
    gender: string
    dob: string | null
    language: string
    timezone: string | null
    avatar: string
    assistant: boolean
    staff: boolean
    professional: string
    businessCountry: string
    isVideoTutorialSkipped: boolean
    isVlabTutorialSkipped: boolean | null
    termUpdateAt: string | null
    termAndAgreement: string | null
    name: string
  }
  account: {
    id: string
    userId: string
    email: string
    role: string
    type: string
    isActive: boolean
    verifyCode: string
    emailConnectLinked: string | null
    lastNotifyEmailAt: number | null
    lastActiveTime: number
  }
}

export type CurrentUserResponseData = ApiResponseData<CurrentUserDto>
