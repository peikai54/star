<template>
  <section class="login-box">
    <main class="main">
      <header class="header-box">STAR</header>
      <main class="form-main">
        <el-form v-model="state.form" :rules="rules">
          <el-form-item prop="name">
            <el-input
              v-model="state.form.user_name"
              placeholder="请输入账号，无账号可点击游客登录体验功能"
              autocomplete="off"
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="state.form.password"
              type="password"
              placeholder="请输入密码"
              autocomplete="off"
              :prefix-icon="Lock"
            />
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="primary">登录</el-button>
          </el-form-item>
        </el-form>
      </main>
      <footer>
        <el-button
          @click="onLoginByTourist"
          link
          type="primary"
          :loading="state.loadingTour"
        >
          游客登录
        </el-button>
      </footer>
    </main>
  </section>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import type { FormRules } from "element-plus";
import { Login } from "../api/user/Login";
import { reactive } from "vue";
import { GetUserInfo } from "../api/user/GetUserInfo";
import { useRouter } from "vue-router";

interface IState {
  form: {
    user_name: string;
    password: string;
  };
  loadingTour: boolean;
}

const state: IState = reactive({
  form: { password: "", user_name: "" },
  loadingTour: false,
});

const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const router = useRouter();

const onLoginByTourist = async () => {
  try {
    state.loadingTour = true;
    const result = await Login.request({
      body: { user_name: "游客测试账号", password: "" },
    });
    await GetUserInfo.request({ params: { token: result?.data?.token } });
    localStorage.setItem("token", result?.data?.token);
    router.push("/project");
  } catch (error) {
  } finally {
    state.loadingTour = false;
  }
};
</script>

<style scoped lang="scss">
.login-box {
  width: 100vw;
  height: 100vh;

  .main {
    position: absolute;
    top: 35%;
    left: 50%;
    text-align: center;
    transform: translate(-50%, -50%);

    .header-box {
      font-size: 80px;
      margin-bottom: 20px;
      color: rgb(0, 132, 255);
    }
  }

  .form-main {
    width: 350px;
  }

  .footer {
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
