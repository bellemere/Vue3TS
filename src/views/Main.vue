<template>
  <div class="main">
    <DashBoard />
    <div class="view"><router-view /></div>
  </div>
</template>

<script setup lang="ts">
import DashBoard from "../components/Main/DashBoard.vue";
</script>

<style scoped lang="less">
.main {
  display: flex;
  width: 100%;
  height: 100%;
  .view {
    width: calc(100% - 60px);
    height: 100%;
  }
}
</style>
