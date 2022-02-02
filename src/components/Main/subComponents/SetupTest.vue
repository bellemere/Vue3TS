<template>
  <div>Child count: {{ count }}</div>
  <div>Parent addr: {{ addr }}</div>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from "vue";

export default defineComponent({
  setup(props, { expose }) {
    const addr = inject("addr", "XuHui");

    const count = ref(0);
    const increment = () => {
      count.value++;
    };

    expose({
      increment,
    });

    return {
      count,
      addr,
    };
  },
});
</script>
