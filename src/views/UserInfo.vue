<template>
  <div class="userinfo-container">
    <main class="card">
      <p class="title">个人中心</p>
      <div class="main">
        <p class="item">
          <span class="label">头像：</span>
          <span class="img-value">
            <img
              class="avatar"
              src="https://wework.qpic.cn/wwpic/656827_BY7tFmKARaqmGV5_1677860369/0"
            />
          </span>
        </p>
        <p v-for="item in state.dataList" class="item" :key="item.label">
          <span class="label">{{ item.label }}：</span>
          <span class="value">{{ item.value }}</span>
        </p>
      </div>
      <footer>
        <el-button @click="handleDownload" type="primary">点击有惊喜</el-button>
        <el-button
          type="danger"
          plai
          @click="(e) => (state.loginOutVisible = true)"
        >
          退出登录
        </el-button>
      </footer>
    </main>
    <el-dialog
      v-model="state.loginOutVisible"
      title="退出登录"
      width="400px"
      draggable
    >
      <span style="margin-left: 20px">确定要退出登录吗?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="primary"
            :loading="state.loginOutLoading"
            @click="loginOut"
          >
            退出登录
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useGetUserInfo } from "@/utils/getUserInfo";
import { reactive } from "vue";

interface IState {
  dataList: { label: string; value: string }[];
  loginOutVisible: boolean;
  loginOutLoading: boolean;
}

const userInfo = useGetUserInfo();

const state: IState = reactive({
  dataList: [
    {
      label: "用户名",
      value: userInfo?.user_name,
    },
    {
      label: "昵称",
      value: "游客",
    },
    {
      label: "邮箱",
      value: "2374907284@qq.com",
    },
    {
      label: "账号级别",
      value: "管理员",
    },
  ],
  loginOutVisible: false,
  loginOutLoading: false,
});

const handleDownload = async () => {
  window.open("http://139.9.84.138:8000/static/resume");
};

const loginOut = () => {
  state.loginOutLoading = true;
  setTimeout(() => {
    window.location.href = `${location.origin}/login`;
    state.loginOutLoading = false;
  }, 1000);
};
</script>

<style lang="scss">
.userinfo-container {
  padding: 20px;
  background-color: #f5f5f5;
  max-height: calc(100vh - 56px);
  box-sizing: border-box;
  overflow: auto;

  .card {
    height: 400px;
    background-color: white;
    padding: 24px;
    border-radius: 5px;

    .title {
      font-weight: 700;
    }

    .main {
      margin-top: 24px;
      color: #000000d9;
      font-weight: 400;
      font-size: 14px;
      line-height: 1.5715;
      text-align: start;

      .item {
        height: 44px;
        display: flex;
        align-items: center;
        .label {
          display: inline-block;
        }
        .img-value {
          .avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>
