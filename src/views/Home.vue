<template>
  <div class="home">
    <MainPageShoes /><LanguageSelector
      :lang="lang"
      @setupLang="setupLang"
      class="lang"
    /><LoginArea :lang="lang" />
  </div>
</template>

<script lang="ts" setup>
import MainPageShoes from "../components/Home/MainPageShoes.vue";
import LanguageSelector from "../components/Home/LanguageSelector.vue";
import LoginArea from "../components/Home/LoginArea.vue";
import { ref } from "vue";
import { getI18nLang } from "../locales";

let lang = ref<string>(getI18nLang());

function setupLang(l: string) {
  lang.value = l;
}
</script>

<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .lang {
    position: absolute;
    left: 20px;
    bottom: 20px;
  }
}
</style>
