<template>
  <button :disabled="loading" @click="getPosts">Get posts</button>

  <p v-if="loading" role="alert">Loading your posts…</p>
  <ul v-else>
    <li v-for="post in posts" :key="post.id" data-test="post">
      {{ post.title }}
    </li>
  </ul>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

type Posts = {
  id: string;
  title: string;
};

export default defineComponent({
  data() {
    return {
      posts: [] as Posts[],
      loading: false,
    };
  },
  methods: {
    async getPosts() {
      this.loading = true;
      this.posts = await axios.get("/api/posts");
      this.loading = false;
    },
  },
});
</script>
