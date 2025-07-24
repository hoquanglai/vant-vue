export default interface UserDto {
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
