<template>
  <div>
    <h3 style="padding-left: 40px">欢迎来到我的代码世界</h3>
    <div class="app-template-container">
      <div class="box-card" v-for="item in templateList">
        <el-card :key="item.appName">
          <template #header>
            <div class="card-header">
              <span>{{ item.appName }}</span>
              <el-button
                type="primary"
                @click="(e) => handleDownload(e, item.pathUrl)"
                text
                >点击下载</el-button
              >
            </div>
          </template>
          <div class="text">{{ item.desc }}</div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ITemplate {
  appName: string;
  pathUrl: string;
  desc: string;
}

const baseURL = "http://139.9.84.138:8000";

const templateList: ITemplate[] = [
  {
    appName: "Express应用模板",
    pathUrl: "/static/express",
    desc: `基于express框架创建的web服务端应用，应用语言为NodeJS，轻便简单开箱即用，是一个保持最小规模的灵活的 Web 应用程序开发框架，
    为 Web 和移动应用程序提供一组强大的功能`,
  },
  {
    appName: "React-TS应用模板",
    pathUrl: "/static/react-ts",
    desc: `基于Webpack手动搭建的React模板，集成TypeScript，简单灵活的小应用。Webpack仅处理了JS、CSS、HTML及tsx资源，进入开发前需要引入相应的代码规范，不适合直接开发。`,
  },
  {
    appName: "React-JS应用模板",
    pathUrl: "/static/react-js",
    desc: `基于create-react-app脚手架构建的前端应用模板, 集成了react-router。因脚手架特性，webpack的相关配置没有被暴露
    ，有这方面需求请前往creat-react-app官网查看文档`,
  },
  {
    appName: "Vue应用模板",
    pathUrl: "/static/vue-template",
    desc: `基于Vue3.0的前端应用模板，使用Vue官方提供的脚手架进行构建，vite进行打包和配置。支持TypeScript类型定义，集合了Pinia进行状态管理，
    Vue-Router进行路由管理，开箱即用。`,
  },
  {
    appName: "Go的Web服务模板",
    pathUrl: "/static/gin-rest",
    desc: "Go语言编写，基于gin框架的rest应用模板。好像不太好用。有空的话后续自己再补上，以及是否接入MySql等内容后续应该会设置成可配置选项，模板下载会更灵活一点",
  },
  {
    appName: "Koa应用模板",
    pathUrl: "/static/koa2",
    desc: "Node编写，基于koa框架的后端应用。koa基本是个轻量版的express，但比express更方便快捷，相应的模板内容也不多。如果需要快速进入开发还是更推荐上面的Express模板。",
  },
];

const handleDownload = (e, pathUrl) => {
  e?.target?.blur();
  window.open(`${baseURL}${pathUrl}`);
};
</script>

<style lang="scss">
.app-template-container {
  padding: 16px;

  display: flex;
  flex-flow: wrap;

  .box-card {
    padding: 0 20px;
    margin-bottom: 30px;
    flex-wrap: wrap;
    flex: 0 0 20%;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .text {
      font-size: 14px;
      line-height: 24px;
    }
  }
}
</style>
