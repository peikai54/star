import type { GetUserInfo } from "@/api/user/GetUserInfo";
import { defineStore } from "pinia";

interface IState {
  userInfo: GetUserInfo.Response200["info"];
}

export const useUserStore = defineStore("user", {
  state: (): IState => {
    return {
      userInfo: {
        user_id: 0,
        user_name: "",
      },
    };
  },
  actions: {
    setUserInfo(user: Partial<GetUserInfo.Response200["info"]>) {
      this.userInfo = { ...this.userInfo, ...user };
    },
  },
});
