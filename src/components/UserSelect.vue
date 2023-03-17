<template>
  <el-select
    placeholder="请选择用户"
    v-model="props.value"
    style="width: 100%"
    @change="handleChange"
    filterable
    clearable
    :multiple="props.isMultiple"
  >
    <el-option
      v-for="item in state.userList"
      :key="item.user_id"
      :label="item.user_name"
      :value="item.user_id"
    />
  </el-select>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import { GetUserList } from "@/api/user/GetUserList";

interface IState {
  userList: GetUserList.Response200["list"];
}

const props = defineProps({ value: Number, isMultiple: Boolean });

const emit = defineEmits<{
  (e: "change", value: number): void;
}>();

const state: IState = reactive({ userList: [] });

const handleChange = (value) => {
  emit("change", value);
};

onMounted(async () => {
  try {
    const result = await GetUserList.request();
    state.userList = result.data.list;
  } catch (error) {
    console.error(error);
    ElMessage.error("获取用户列表错误");
  }
});
</script>
