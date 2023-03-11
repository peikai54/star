<template>
  <div class="table-container">
    <section class="table-header">
      <el-button type="primary" @click="(e) => openEditForm(e)">
        新增项目
      </el-button>
    </section>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
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
import { reactive } from "vue";
import { CreateProject } from "../api/project/CreateProject";
import { ElMessage } from "element-plus";
import "element-plus/dist/index.css";
import EditForm, {
  type IProjectForm,
} from "../components/Project/EditForm.vue";
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

const state = reactive({ editFormVisible: false, createProjectLoading: false });

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

  .table-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 16px;
  }
}
</style>
