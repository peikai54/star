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

const locale = zhCn;

const router = useRouter();

onMounted(async () => {
  if (location.pathname === "/login") {
    return;
  }
  try {
    await GetUserInfo.request();
  } catch (error) {
    ElMessage.error("登录失败");
    router.push("/login");
  }
});
</script>

<style scoped></style>
