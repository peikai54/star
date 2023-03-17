<template>
  <div class="table-container">
    <section class="table-header">
      <section>需求列表</section>
      <section>
        <el-button type="primary"> 新增需求 </el-button>
        <el-button type="primary" @click="handleRefresh" :icon="RefreshRight" />
      </section>
    </section>
    <section class="form">
      <el-form :model="state.form" class="form-part" label-width="70">
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
            <el-form-item label="绑定项目">
              <ProjectSelect
                :value="state.form.project_id"
                @change="(value) => (state.form.project_id = value)"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-form" gutter="24">
          <el-col :span="8">
            <el-form-item label="处理人">
              <UserSelect
                :value="state.form.handler"
                @change="(value) => (state.form.handler = value)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="需求状态">
              <StatusSelect
                :value="state.form.status"
                @change="(value) => (state.form.status = value)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="8">
              <el-button @click="handleSearch" :icon="Search" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <el-table
      v-loading="state.tableLoading"
      :data="state.list"
      border
      style="width: 100%"
      class="table-box"
    >
      <el-table-column type="index" width="50" />
      <el-table-column prop="story_name" label="需求名称" />
      <el-table-column prop="project_info.project_name" label="绑定项目" />
      <el-table-column label="需求状态" prop="status">
        <template #default="scope">
          <span style="color: #3ad26b" v-if="scope.row.status === '已发布'">
            {{ scope.row.status }}
          </span>
          <span style="color: #409eff" v-if="scope.row.status === '测试中'">
            {{ scope.row.status }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="created_by.name" label="创建人" />
      <el-table-column
        prop="created_by.handler_list"
        label="处理人"
        width="200"
      >
        <template #default="scope">
          <div>
            {{
              scope.row.handler_list?.map((el) => el.name)?.join("，") || "-"
            }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { RefreshRight, Search } from "@element-plus/icons-vue";
import { reactive, onMounted } from "vue";
import ProjectSelect from "@/components/Project/ProjectSelect.vue";
import UserSelect from "@/components/UserSelect.vue";
import { GetStortyist } from "@/api/story/GetStoryList";
import { ElMessage } from "element-plus";

interface IState {
  form: {
    story_name?: string;
    created_by?: string;
    project_id?: number;
    handler?: number;
    status?: string;
  };
  list: GetStortyist.Response200["list"];
  tableLoading: boolean;
}

const state: IState = reactive({
  form: {},
  list: [],
  tableLoading: false,
});

const getStoryList = async (params: GetStortyist.Params) => {
  try {
    state.tableLoading = true;
    const result = await GetStortyist.request({ params });
    state.list = result?.data?.list;
  } catch (error) {
    ElMessage.error("需求列表获取错误");
  } finally {
    state.tableLoading = false;
  }
};

const handleSearch = () => {
  getStoryList(state.form);
};

const handleRefresh = () => {
  state.form = {};
  getStoryList({});
};

onMounted(() => {
  getStoryList({});
});
</script>

<style lang="scss" scoped></style>
