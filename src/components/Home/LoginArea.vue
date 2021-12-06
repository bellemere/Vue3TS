<template>
  <div class="area">
    <input :placeholder="username" />
    <input :placeholder="password" type="password" />
    <button class="login" @click="directToMain">{{ login }}</button>
    <button class="sign">{{ sign }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginArea",
  data() {
    return {
      sign: "",
      login: "",
      username: "",
      password: "",
    };
  },
  props: {
    lang: String,
  },
  methods: {
    produceText() {
      this.sign = this.$translate("homePage.sign");
      this.login = this.$translate("homePage.login");
      this.username = this.$translate("homePage.username");
      this.password = this.$translate("homePage.password");
    },
    directToMain() {
      this.$router.push("/main/chat");
    },
  },
  watch: {
    lang() {
      this.produceText();
    },
  },
  created() {
    this.produceText();
  },
});
</script>

<style scoped lang="less">
@green: #4caf50;
@height: 60px;
@width: 260px;
@white: white;
@border: gray;
@radius: 3px;
@bwidth: 220px;
@bheight: 40px;
@font-size: 16px;
@line: 2px;
.area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 100px;
  top: calc(30% - @height / 2);
  background-color: @white;
  width: @width;
  border: solid @line @border;
  border-radius: @radius;
  padding: 20px 0;
  box-shadow: 10px 10px 5px #888888;
  * {
    outline: none;
    margin: 5px 0 5px 0;
    width: @bwidth;
    height: @bheight;
    border-radius: @radius;
    font-size: @font-size;
  }

  .login,
  .sign {
    border: none;
    color: @white;
    background-color: @green;
  }
  input {
    padding: 5px;
    border: solid @line @green;
    background-color: @white;
  }
}
</style>
