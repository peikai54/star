import {} from "vue";
import { useUserStore } from "@/store/user";

export const useGetUserInfo = () => {
  const userStore = useUserStore();
  const result = { ...userStore.userInfo };
  return result;
};
