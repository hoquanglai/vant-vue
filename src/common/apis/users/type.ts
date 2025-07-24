import type { ApiResponseData } from "types/api"
import type AccountDto from "./accountDto"
import type UserDto from "./userDto"

export interface CurrentUserDto {
  accountId: string
  userId: string
  user: UserDto
  account: AccountDto
}

export type CurrentUserResponseData = ApiResponseData<CurrentUserDto>
