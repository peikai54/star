<template>
  <header class="header">
    <div class="left-part">
      <el-icon v-if="isCollapse" @click="collapseMenu" class="expand-icon"
        ><Expand
      /></el-icon>
      <el-icon v-if="!isCollapse" @click="expandedMenu" class="expand-icon"
        ><Fold
      /></el-icon>
      Star
    </div>
    <div class="right-part">
      <img
        data-v-50bb1d33=""
        src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
        class="user-avatar"
      />
    </div>
  </header>
</template>

<style lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  border-bottom: 1px solid rgb(238, 238, 238);
  .left-part {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 24px;

    font-weight: 500;
    font-family: PingFangSC-Medium, "PingFang SC";
    color: rgb(31, 46, 77);

    .expand-icon {
      margin-right: 8px;
      font-size: 16px;
      cursor: pointer;
    }
  }

  .right-part {
    height: 100%;
    display: flex;
    align-items: center;
    .user-avatar {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
  }
}
</style>

<script setup>
import { Expand, Fold } from "@element-plus/icons-vue";

defineProps({
  isCollapse: Boolean,
});

const emit = defineEmits(["handleCollapse"]);

const expandedMenu = () => emit("handleCollapse", true);

const collapseMenu = () => emit("handleCollapse", false);
</script>
