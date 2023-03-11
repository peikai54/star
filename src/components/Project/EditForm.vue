<template>
  <div>
    <el-dialog
      :before-close="onCancel"
      v-model="state.isModalVisible"
      :title="props.title"
      width="30%"
    >
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { watch, reactive, watchEffect } from "vue";
import * as _ from "lodash";

const props = defineProps({
  visible: Boolean,
  title: String,
});

const emit = defineEmits(["onCancel"]);

const state = reactive({ isModalVisible: false });

const onCancel = () => {
  state.isModalVisible = false;
  emit("onCancel");
};

watch(
  () => _.cloneDeep(props.visible),
  (oldValue, newValue) => {
    state.isModalVisible = props.visible;
  }
);
</script>
