<template>
  <div class="table-container">
    <section class="table-header">
      <section>需求列表</section>
      <section>
        <el-button type="primary" @click="openEditForm"> 新增需求 </el-button>
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
          <span style="color: #e6a236" v-if="scope.row.status === '规划中'">
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

    <StoryEditForm
      title="新增需求"
      @onCancel="state.editFormVisible = false"
      :visible="state.editFormVisible"
      @onOK="handleAddStory"
      :loading="state.editFormLoading"
    />
  </div>
</template>

<script lang="ts" setup>
import { RefreshRight, Search } from "@element-plus/icons-vue";
import { reactive, onMounted } from "vue";
import ProjectSelect from "@/components/Project/ProjectSelect.vue";
import UserSelect from "@/components/UserSelect.vue";
import { GetStortyist } from "@/api/story/GetStoryList";
import { ElMessage } from "element-plus";
import StoryEditForm, { type IForm } from "@/components/StoryEditForm.vue";
import { AddStore } from "@/api/story/AddStore";
import { useGetUserInfo } from "@/utils/getUserInfo";

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
  editFormVisible: boolean;
  editFormLoading: boolean;
}

const state: IState = reactive({
  form: {},
  list: [],
  tableLoading: false,
  editFormVisible: false,
  editFormLoading: false,
});

const userInfo = useGetUserInfo();

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

const openEditForm = (e) => {
  e?.target?.blur();
  state.editFormVisible = true;
};

const handleAddStory = async (value: IForm) => {
  state.editFormLoading = true;
  try {
    await AddStore.request({
      body: {
        handler: value?.handler,
        story_name: value?.story_name || "",
        project_id: value?.project_id || 0,
        status: "规划中",
        created_by: userInfo?.user_id,
      },
    });
    getStoryList({});
    state.form = {};
    state.editFormVisible = false;
  } catch (error) {
    ElMessage.error("新增失败");
  } finally {
    state.editFormLoading = false;
  }
};
</script>

<style lang="scss" scoped></style>
