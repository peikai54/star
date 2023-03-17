<template>
  <div>
    <el-dialog
      :before-close="onCancel"
      v-model="state.isModalVisible"
      :title="props.title"
      width="30%"
    >
      <el-form
        :inline="true"
        label-width="100px"
        :model="form"
        class="demo-form-inline"
        :rules="rules"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item
              prop="projectName"
              label="项目名称："
              style="width: 100%"
            >
              <el-input
                v-model="form.projectName"
                placeholder="请填写项目名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24" style="margin-bottom: -16px">
            <el-form-item
              prop="projectName"
              label="项目类型："
              style="width: 100%"
            >
              <el-select
                style="width: 100%"
                v-model="form.type"
                placeholder="请选择项目类型"
              >
                <el-option
                  v-for="item in valueType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onOK" :loading="loading">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { watch, reactive } from "vue";
import * as _ from "lodash";
import type { FormRules } from "element-plus";

export interface IProjectForm {
  projectName: string;
  type: number;
}

const valueType = [
  { label: "基本类型", value: 1 },
  { label: "测试项目", value: 2 },
];

const props = defineProps({
  visible: Boolean,
  title: String,
  loading: Boolean,
});

const emit = defineEmits(["onCancel", "onOK"]);

const state = reactive({ isModalVisible: false });

const form: IProjectForm = reactive({
  projectName: "",
  type: 1,
});

const onCancel = () => {
  state.isModalVisible = false;
  emit("onCancel");
};

const onOK = () => {
  emit("onOK", form);
};

const rules = reactive<FormRules>({
  projectName: [{ required: true, message: "请填写项目名称", trigger: "blur" }],
  type: [{ required: true, message: "请选择项目类型", trigger: "blur" }],
});

watch(
  () => _.cloneDeep(props.visible),
  (oldValue, newValue) => {
    state.isModalVisible = props.visible;
  }
);
</script>
