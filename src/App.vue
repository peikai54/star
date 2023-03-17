<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { GetUserInfo } from "./api/user/GetUserInfo";
import { useUserStore } from "@/store/user";

const locale = zhCn;

const router = useRouter();

const userStore = useUserStore();

onMounted(async () => {
  if (location.pathname === "/login") {
    return;
  }
  try {
    const token = localStorage.getItem("token") || "";
    const result = await GetUserInfo.request({ params: { token } });
    userStore.setUserInfo(result?.data?.info);
  } catch (error) {
    ElMessage.error("登录失败");
    setTimeout(() => {
      router.push("/login");
    }, 500);
  }
});
</script>

<style scoped></style>
