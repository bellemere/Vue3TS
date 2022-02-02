<template>
  <div
    class="dashboard"
    :class="{ expand: isExpanded }"
    @mouseenter="enter"
    @mouseleave="leave"
  >
    <div
      class="item"
      v-for="item in itemList"
      @click="itemClick(item.route)"
      :key="item.name"
    >
      <img
        :src="item.src"
        :class="{ 'img-expand': isExpanded }"
        @load="imgLoad"
      />
      <div :class="{ 'span-expand': isExpanded }">{{ item.name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import svgChat from "@/assets/svgs/chat.svg";
import svgAnime from "@/assets/svgs/anime.svg";
import svgTest from "@/assets/svgs/test.svg";

type Item = {
  src: string;
  name: string;
  route?: string;
};

export default defineComponent({
  data() {
    return {
      isExpanded: false,
      itemList: [] as Array<Item>,
    };
  },
  methods: {
    enter() {
      this.isExpanded = true;
    },
    leave() {
      this.isExpanded = false;
    },
    itemClick(route = "chat") {
      this.$router.push(`/main/${route}`);
    },
    imgLoad() {
      console.log("loaded");
    },
  },
  created() {
    this.itemList = [
      {
        src: svgChat,
        name: this.$translate("mainPage.chat"),
      },
      {
        src: svgAnime,
        name: this.$translate("mainPage.anime"),
        route: "anime",
      },
      {
        src: svgTest,
        name: this.$translate("mainPage.test"),
        route: "test",
      },
    ];
  },
});
</script>

<style scoped lang="less">
@green: #4caf50;
@dark-green: #4ca050;
@width: 60px;
@height: 60px;
@img-width: 30px;
@img-height: 30px;
@text-height: 15px;
@text-width: 40px;
@font-color: white;
@expand-width: 150px;
@sec: 0.25s;
.dashboard {
  background: @green;
  width: @width;
  height: 100%;
  transition: all @sec;
  .item {
    position: relative;
    width: 100%;
    height: @height;
    * {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:hover {
      background-color: @dark-green;
    }
    img {
      position: absolute;
      top: 5px;
      left: (@width - @img-width)/2;
      width: @img-width;
      height: @img-height;
      transition: all @sec;
    }
    .img-expand {
      transform: scale(1.4);
      top: 15px;
      left: 25px;
    }
    div {
      position: absolute;
      width: @text-width;
      height: @text-height;
      left: (@width - @text-width)/2;
      bottom: 5px;
      color: @font-color;
      transition: all @sec;
    }
    .span-expand {
      left: 70px;
      height: 20px;
      font-size: 18px;
      bottom: 20px;
    }
  }
}
.expand {
  width: @expand-width;
}
</style>
