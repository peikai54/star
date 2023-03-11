<template>
  <div class="home-view">
    <AsideNav :isCollapse="state.isCollapse" />
    <div
      :class="{
        'main-container': !state.isCollapse,
        'collapse-container': state.isCollapse,
      }"
    >
      <HeaderNav
        :isCollapse="state.isCollapse"
        @handleCollapse="handleCollapse"
      />
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import AsideNav from "../common/AsideNav.vue";
import HeaderNav from "../common/HeaderNav.vue";
import { reactive } from "vue";

const state = reactive({ isCollapse: false });

const handleCollapse = (collapse: boolean) => {
  state.isCollapse = collapse;
};
</script>

<style lang="scss">
.home-view {
  display: flex;

  .aside {
    max-width: 226px;
    width: 200px;
    transition: width 0.2s;
  }

  .collapse-aside {
    width: 64px;
    transition: width 0.2s;
  }

  .main-container {
    min-height: 100vh;
    width: calc(100vw - 200px);
    transition: width 0.2s;
  }

  .collapse-container {
    width: calc(100vw - 64px);
    transition: width 0.2s;
  }
}
</style>
