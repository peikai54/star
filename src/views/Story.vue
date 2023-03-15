<template>
  <div class="table-container">
    <section class="table-header">
      <section>需求列表</section>
      <section>
        <el-button type="primary"> 新增需求 </el-button>
        <el-button type="primary" :icon="RefreshRight" />
      </section>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { RefreshRight } from "@element-plus/icons-vue";
</script>

<style lang="scss" scoped></style>
