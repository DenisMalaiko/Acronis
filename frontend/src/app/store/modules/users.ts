import { defineStore } from 'pinia';
import { admin } from "../../../shared/const/Users.ts";
import type { UserType } from "../../../shared/types/User.ts";

export const useUsersStore = defineStore('users', {
  state: () => ({
    user: admin as UserType | null,
  }),

  actions: {
    setUser(user: UserType) {
      this.user = user;
    },
  }
})