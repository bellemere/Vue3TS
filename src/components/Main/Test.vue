<template>
  <div class="test">
    <SetupTest ref="setup"></SetupTest>
    <div>Parent Title: {{ title }}</div>
    <button @click="addString">Change Title</button>
    <button @click="addCount">Change Sub Component's Count</button>
    <div>Parent Addr: {{ addr }}</div>
    <button @dblclick="changeAddr">Change Addr</button>
    <div>Parent Num: {{ num }}</div>
    <button @click="changeColor">Change BG Color</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, provide, watchEffect } from "vue";
import SetupTest from "./subComponents/SetupTest.vue";

export default defineComponent({
  setup() {
    let title = ref("hello world");

    let setup = ref<typeof SetupTest>();

    const addCount = () => {
      setup.value?.increment();
    };

    const addString = () => {
      title.value += "__foo__";
    };

    const addr = ref("ShangHai");

    const changeAddr = () => {
      addr.value += "__bar__";
    };

    provide("addr", addr);

    let num = ref(0);

    watchEffect(async (onInvalidate) => {
      onInvalidate(() => {
        num.value = 0;
      });
      num.value = await new Promise((resolve) => {
        setTimeout(() => resolve(1), 1000);
      });
    });

    setTimeout(() => (addr.value = "Xuhui"), 500);

    const theme = reactive({
      color: "white",
    });

    const changeColor = () => {
      theme.color = theme.color === "white" ? "gray" : "white";
    };

    return {
      title,
      setup,
      addr,
      num,
      theme,
      addCount,
      addString,
      changeAddr,
      changeColor,
    };
  },
  components: { SetupTest },
});
</script>

<style scoped lang="less">
.test {
  width: 100%;
  height: 100%;
  background-color: v-bind("theme.color");
}
</style>
