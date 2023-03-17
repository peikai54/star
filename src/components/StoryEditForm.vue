<template>
  <el-dialog
    :before-close="onCancel"
    v-model="state.isModalVisible"
    :title="props.title"
    width="30%"
  >
    <el-form
      :model="form"
      :inline="true"
      label-width="100px"
      class="demo-form-inline"
      :rules="rules"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            prop="story_name"
            label="需求名称："
            style="width: 100%"
          >
            <el-input
              clearable
              v-model="form.story_name"
              placeholder="请填写需求名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            prop="project_name"
            label="绑定项目："
            style="width: 100%"
          >
            <ProjectSelect
              :value="form.project_id"
              @change="(value) => (form.project_id = value)"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="处理人：" style="width: 100%">
            <UserSelect
              isMultiple="true"
              :value="form.handler"
              @change="(value) => (form.handler = value)"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleSubmit" :loading="loading">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormRules } from "element-plus";
import { cloneDeep } from "lodash-es";
import { reactive, watch } from "vue";

export interface IForm {
  story_name?: string;
  project_id?: number;
  handler?: number[];
}

const props = defineProps({
  visible: Boolean,
  title: String,
  loading: Boolean,
});

const emit = defineEmits<{
  (e: "onCancel"): void;
  (e: "onOK", value: IForm): void;
}>();

const state = reactive({ isModalVisible: false });

const form: IForm = reactive({ story_name: "" });

const rules = reactive<FormRules>({
  story_name: [
    {
      required: true,
      message: "需求名称不能为空",
      trigger: ["blur", "change"],
    },
  ],
  project_name: [
    { required: true, message: "请选择绑定项目", trigger: "blur" },
  ],
});

const onCancel = () => {
  state.isModalVisible = false;
  emit("onCancel");
};

const handleSubmit = () => emit("onOK", form);

watch(
  () => cloneDeep(props.visible),
  (oldValue, newValue) => {
    state.isModalVisible = props.visible;
  }
);
</script>
