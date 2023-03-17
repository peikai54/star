<template>
  <el-select
    placeholder="请选择需求状态"
    v-model="props.value"
    style="width: 100%"
    clearable
    @change="handleChange"
    filterable
  >
    <el-option
      v-for="item in state.statusList"
      :key="item.status_name"
      :label="item.status_name"
      :value="item.status_name"
    />
  </el-select>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import { GetStatusList } from "@/api/story/GetStatusList";

interface IState {
  statusList: GetStatusList.Response200["list"];
}

const props = defineProps({ value: String });

const emit = defineEmits<{
  (e: "change", value: number): void;
}>();

const state: IState = reactive({ statusList: [] });

const handleChange = (value) => {
  emit("change", value);
};

onMounted(async () => {
  try {
    const result = await GetStatusList.request();
    state.statusList = result.data.list;
  } catch (error) {
    console.error(error);
    ElMessage.error("获取需求列表错误");
  }
});
</script>
