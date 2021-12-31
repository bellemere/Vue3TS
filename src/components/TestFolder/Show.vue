<template>
  <div v-if="show">{{ greeting }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      greeting: "Hello",
    };
  },
});
</script>
