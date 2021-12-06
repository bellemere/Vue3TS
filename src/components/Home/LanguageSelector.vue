<template>
  <div>
    <ul v-if="showItems" class="list">
      <li
        v-for="item in langList"
        :key="item.value"
        @click="setLang(item.value)"
      >
        {{ item.text }}
      </li>
    </ul>
    <button class="lang" @click="changeStatus">
      <span>{{ text }}</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { i18nSetup } from "../../locales/index";

export default defineComponent({
  name: "LanguageSelector",
  data() {
    return {
      text: "",
      langList: [
        { text: "中文", value: "zh" },
        { text: "English", value: "en" },
      ],
      showItems: false,
    };
  },
  props: {
    lang: String,
  },
  emits: {
    // eslint-disable-next-line
    setupLang: (lang: string) => {
      return true;
    },
  },
  methods: {
    changeStatus() {
      this.showItems = !this.showItems;
    },
    setLang(lang: string) {
      i18nSetup(lang);
      this.text = this.$translate("mainPage.lang");
      this.$emit("setupLang", lang);
      this.showItems = false;
    },
  },
  created() {
    this.text = this.$translate("mainPage.lang");
  },
});
</script>

<style scoped lang="less">
@green: #4caf50;
@white: white;
@width: 100px;
@height: 30px;
@radius: 3px;
.list {
  position: absolute;
  width: @width;
  bottom: @height+1;
  left: 0;
  color: @green;
  border: solid 1px @green;
  border-radius: @radius;
  list-style-type: none;
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    vertical-align: middle;
  }
  li:hover {
    background-color: @green;
    color: @white;
  }
}
.lang {
  display: flex;
  align-items: center;
  justify-content: center;
  width: @width;
  height: @height;
  border: none;
  outline: none;
  border-radius: @radius;
  color: @white;
  background-color: @green;
}
</style>
