<template>
  <div class="table-container">
    <section class="table-header">
      <el-button type="primary" @click="(e) => openEditForm(e)"
        >新增项目</el-button
      >
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
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import EditForm from "../components/Project/EditForm.vue";
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

const state = reactive({ editFormVisible: false });

const openEditForm = (e) => {
  e?.target?.blur();
  state.editFormVisible = true;
};

const closeEditForm = () => {
  state.editFormVisible = false;
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
