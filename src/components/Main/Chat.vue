<template>
  <div class="chat">
    <div
      class="item"
      :style="styleObject"
      v-for="item in connection_pool"
      :key="item.index"
    >
      <div class="rect">
        <div
          class="message"
          v-for="message in item.message_list"
          :key="message"
        >
          {{ message }}
        </div>
      </div>
      <div class="operation">
        <input class="text" v-model="item.model.value" />
        <button class="send" @click="send(item.connection, item.model)">
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, Ref } from "vue";

const COLUMN = 3;

function send(ws: WebSocket, text: Ref<string>) {
  ws.send(text.value);
  text.value = "";
}

const styleObject = {
  width: 100 / COLUMN + "%",
};

const connection_pool = new Array(COLUMN).fill(null).map((_, index) => {
  const message_list: string[] = reactive([]);
  let item = {
    index,
    message_list,
    connection: new WebSocket(process.env.VUE_APP_WS_URL),
    model: ref(""),
  };
  (item.connection as WebSocket).onmessage = function (e) {
    item.message_list.push(e.data);
  };

  return item;
});
</script>

<style scoped lang="less">
.chat {
  display: flex;
  width: 100%;
  height: 100%;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .rect {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 90%;
      height: calc(100% - 50px);
      overflow: scroll;
      border: solid 1px gray;
      border-radius: 3px;
      &::-webkit-scrollbar {
        display: none;
      }
      .message {
        text-align: left;
        width: fit-content;
        max-width: 95%;
        border: solid 1px #4ca050;
        border-radius: 3px;
        margin: 5px 0;
        padding: 2px;
        line-height: 18px;
        word-break: break-all;
      }
    }
    .operation {
      display: flex;
      justify-content: space-between;
      width: 90%;
      margin-top: 10px;
      height: 30px;
      .text {
        width: calc(100% - 60px);
        outline: none;
      }
      .send {
        width: 50px;
        border: none;
        outline: none;
        background-color: #4ca050;
        color: white;
        border-radius: 3px;
      }
    }
  }
}
</style>
