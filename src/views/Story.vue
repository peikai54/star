<template>
  <div class="table-container">
    <section class="table-header">
      <section>需求列表</section>
      <section>
        <el-button type="primary"> 新增需求 </el-button>
        <el-button type="primary" :icon="RefreshRight" />
      </section>
    </section>
    <section class="form">
      <el-form :model="state.form" class="form-part">
        <el-row gutter="24" class="row-form">
          <el-col :span="8">
            <el-form-item label="需求名称">
              <el-input
                v-model="state.form.story_name"
                clearable
                placeholder="请填写需求名称，支持模糊搜索"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人">
              <el-input
                clearable
                v-model="state.form.created_by"
                placeholder="请填写创建人,支持模糊搜索"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责项目">
              <ProjectSelect
                :value="state.form.project_id"
                @change="(value) => (state.form.project_id = value)"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-form" gutter="24">
          <el-col :span="8">
            <el-form-item>
              <el-button :icon="Search" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { RefreshRight, Search } from "@element-plus/icons-vue";
import { reactive } from "vue";
import ProjectSelect from "@/components/Project/ProjectSelect.vue";

interface IState {
  form: {
    story_name?: string;
    created_by?: string;
    project_id?: number;
  };
}

const state: IState = reactive({
  form: { story_name: "", created_by: "", project_id: undefined },
});
</script>

<style lang="scss" scoped></style>
