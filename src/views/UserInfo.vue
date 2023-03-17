<template>
  <div class="userinfo-container">
    <main class="card">
      <p class="title">个人中心</p>
    </main>
  </div>
</template>

<script setup lang="ts"></script>

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
  }
}
</style>
