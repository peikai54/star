<template>
  <div class="table-container">
    <section class="table-header">
      <section>项目列表</section>
      <section>
        <el-button type="primary" @click="(e) => openEditForm(e)">
          新增项目
        </el-button>
        <el-button
          type="primary"
          @click="refreshProjectList"
          :icon="RefreshRight"
        />
      </section>
    </section>
    <section class="form">
      <el-form class="form-part">
        <el-row gutter="24" class="row-form">
          <el-col :span="8">
            <el-form-item label="项目名称">
              <el-input placeholder="请填写项目名称" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              prop="projectName"
              label="项目类型："
              style="width: 100%"
            >
              <el-select style="width: 100%" placeholder="请选择项目类型">
                <el-option
                  v-for="item in valueType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人">
              <el-input placeholder="请填写创建人" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-form" gutter="24">
          <el-col :span="8">
            <el-form-item label="创建时间">
              <el-date-picker
                type="datetimerange"
                start-placeholder="请选择创建时间"
                end-placeholder="请选择创建时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button :icon="Search" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <el-table
      v-loading="state.tableLoading"
      :data="state.projectList"
      border
      style="width: 100%"
      class="table-box"
    >
      <el-table-column type="index" width="50" />
      <el-table-column prop="project_name" label="项目名称" />
      <el-table-column prop="type_name" label="项目类型" />
      <el-table-column prop="creator_name" label="创建人" />
      <el-table-column prop="create_at" label="创建时间" />
    </el-table>

    <EditForm
      title="新建项目"
      @onCancel="closeEditForm"
      :visible="state.editFormVisible"
      @onOK="onOK"
      :loading="state.createProjectLoading"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import { CreateProject } from "../api/project/CreateProject";
import { GetProjectList } from "../api/project/GetProjectList";
import { ElMessage } from "element-plus";
import "element-plus/dist/index.css";
import EditForm, {
  type IProjectForm,
} from "../components/Project/EditForm.vue";
import { handleProjectList, type IProject } from "./type";
import { RefreshRight, Search } from "@element-plus/icons-vue";

interface IState {
  editFormVisible: boolean;
  createProjectLoading: boolean;
  tableLoading: boolean;
  projectList: IProject[];
}

const state: IState = reactive({
  editFormVisible: false,
  createProjectLoading: false,
  tableLoading: false,
  projectList: [],
});

const valueType = [
  { label: "基础类型", value: 1 },
  { label: "测试项目", value: 2 },
];

const refreshProjectList = async () => {
  try {
    state.tableLoading = true;
    const result = await GetProjectList.request();
    state.projectList = handleProjectList(result.data.list);
  } catch (error) {
    console.error(error);
    ElMessage.error("获取错误");
  } finally {
    state.tableLoading = false;
  }
};

onMounted(refreshProjectList);

const openEditForm = (e) => {
  e?.target?.blur();
  state.editFormVisible = true;
};

const closeEditForm = () => {
  state.editFormVisible = false;
};

const onOK = async (formValue: IProjectForm) => {
  try {
    state.createProjectLoading = true;
    await CreateProject.request({
      body: {
        user_id: 1,
        project_name: formValue.projectName,
        project_type: formValue.type,
      },
    });
    ElMessage.success("新建成功");
    state.editFormVisible = false;
    refreshProjectList();
  } catch (error) {
    console.error(error);
    ElMessage({ message: "新建失败", type: "error" });
  } finally {
    state.createProjectLoading = false;
  }
};
</script>

<style lang="scss" scoped>
.table-container {
  padding: 16px;
  background-color: #f5f5f5;

  .table-header {
    display: flex;
    background-color: white;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    padding: 8px;
    box-shadow: #ddd 0 0 6px;
  }

  .form {
    background-color: white;
    margin-bottom: 16px;
    box-shadow: #ddd 0 0 6px;

    .el-form-item {
      align-items: center;
      height: 100%;
      margin-bottom: 0 !important;
    }

    .form-part {
      min-height: 56px;

      .row-form {
        min-height: 56px;
        padding: 0 16px;
      }
    }
  }
}
</style>
