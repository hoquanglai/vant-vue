export default interface AccountDto {
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
