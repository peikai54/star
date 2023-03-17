<template>
  <div :class="{ aside: !isCollapse, 'collapse-aside': isCollapse }">
    <el-row class="tac">
      <el-col>
        <el-menu
          active-text-color="#ffd04b"
          background-color="#304156"
          class="el-menu-vertical-demo"
          :default-active="state.active"
          text-color="#fff"
          :collapse="isCollapse"
        >
          <el-menu-item
            @click="() => handleMenuClick('/project')"
            index="project"
          >
            <el-icon><icon-menu /></el-icon>
            <span>项目管理</span>
          </el-menu-item>
          <el-menu-item @click="() => handleMenuClick('/story')" index="story">
            <el-icon><Postcard /></el-icon>
            <span>需求管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { Menu as IconMenu, Postcard } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { onMounted, reactive } from "vue";

defineProps({
  isCollapse: Boolean,
});

const router = useRouter();

const state = reactive({ active: "project" });

onMounted(() => {
  const pathArr = location.pathname?.split("/");
  const tempActive = pathArr?.[1] || "project";
  if (pathArr?.[1] == "") {
    router.push(`/${tempActive}`);
  }
  state.active = tempActive;
});

const handleMenuClick = (path: string) => {
  router.push(path);
};
</script>

<style lang="scss">
.tac {
  background-color: #304156;
  overflow: auto;
  height: 100vh;

  .el-menu-vertical-demo {
    border-right: none !important;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
