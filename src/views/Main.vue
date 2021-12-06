<template>
  <div class="main"><DashBoard /> <router-view /></div>
</template>

<script setup lang="ts">
import DashBoard from "../components/Main/DashBoard.vue";
</script>

<style scoped lang="less">
.main {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
