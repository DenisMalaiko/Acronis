import { UserRoles } from "../enums/UserRoles.ts";
import type { UserType } from "../types/User.ts";

export const partner1: UserType = {
  id: 1,
  role: UserRoles.Partner,
}

export const partner2: UserType = {
  id: 2,
  role: UserRoles.Partner,
}

export const admin: UserType = {
  id: 3,
  role: UserRoles.Admin,
}