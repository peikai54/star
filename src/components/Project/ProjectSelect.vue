<template>
  <el-select
    placeholder="请选择需要筛选的项目"
    v-model="props.value"
    style="width: 100%"
    @change="handleChange"
    filterable
  >
    <el-option
      v-for="item in state.projectList"
      :key="item.project_id"
      :label="item.project_name"
      :value="item.project_id"
    />
  </el-select>
</template>

<script setup lang="ts">
import { handleProjectList, type IProject } from "@/views/type";
import { onMounted, reactive } from "vue";
import { GetProjectList } from "@/api/project/GetProjectList";
import { ElMessage } from "element-plus";

interface IState {
  projectList: IProject[];
}

const props = defineProps({ value: Number });

const emit = defineEmits<{
  (e: "change", value: number): void;
}>();

const state: IState = reactive({ projectList: [] });

const handleChange = (value) => {
  emit("change", value);
};

onMounted(async () => {
  try {
    const result = await GetProjectList.request();
    state.projectList = handleProjectList(result.data.list);
  } catch (error) {
    console.error(error);
    ElMessage.error("获取项目列表错误");
  }
});
</script>
