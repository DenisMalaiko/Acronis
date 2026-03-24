import { UserRoles } from "../enums/UserRoles.ts";

export type UserType = {
  id: number;
  role: UserRoles;
}