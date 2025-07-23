import { getCurrentUserApi } from "@@/apis/users"
import { setToken as _setToken, getToken, removeToken } from "@@/utils/cache/cookies"
import { pinia } from "@/pinia"

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "")

  const fullName = ref<string>("")
  const gender = ref<string>("")
  const professional = ref<string>("")
  const businessCountry = ref<string>("")
  const avatar = ref<string>("")
  const email = ref<string>("")
  const roles = ref<string[]>([])

  const setToken = (value: string) => {
    _setToken(value)
    token.value = value
  }

  const getInfo = async () => {
    const { data } = await getCurrentUserApi()
    console.log("User Info:", data)
    fullName.value = data.user.fullName
    gender.value = data.user.gender
    professional.value = data.user.professional
    businessCountry.value = data.user.businessCountry
    avatar.value = data.user.avatar
    email.value = data.user.email
  }

  const changeRoles = (role: string) => {
    const newToken = `token-${role}`
    token.value = newToken
    _setToken(newToken)
    location.reload()
  }

  const resetToken = () => {
    removeToken()
    token.value = ""
  }

  return {
    roles,
    token,
    fullName,
    gender,
    professional,
    businessCountry,
    email,
    avatar,
    setToken,
    getInfo,
    changeRoles,
    resetToken
  }
})

export function useUserStoreOutside() {
  return useUserStore(pinia)
}
