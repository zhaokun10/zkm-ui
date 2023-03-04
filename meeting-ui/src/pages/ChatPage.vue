<template>
  <q-page class="flex column">
    <q-banner v-if="store.state.exampleModule.online===0? true :false" inline-actions class="bg-grey-4 text-center">
      User is OffLine
    </q-banner>
    <div class="q-pa-md column col full-width">
        <q-chat-message
          v-for="message in messages"
          :name="message.sendUser === store.state.exampleModule.id ? store.state.exampleModule.username :store.state.exampleModule.friendName"
          :avatar="message.avatar"
          :stamp="message.readed===0 ? '未读':'已读'"
          :text="[message.content]"
          :sent="message.sendUser === store.state.exampleModule.id ? true : false"
        />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form
          class="full-width">
          <q-input
            bg-color="white"
            class="full-width"
            outlined
            rounded
            v-model="msg"
            label="Message"
            dense="dense">
            <template v-slot:after>
              <q-btn
                round
                dense
                flat
                @click="sendMessage"
                color="white"
                icon="send"/>
            </template>
          </q-input>
          <p>{{message}}</p>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import {useStore} from "../store";
import qs from "qs";

export default {
  name: "ChatPage",
  data() {
    return {
      msg: '',
      messages: [{
        readed: 0,
        content: "我也是",
        sendUser: 2,

      }],
      store :useStore(),
      ws: null,
      message: "",

    }
  },
  methods:{
    sendMessage(){
      const messgae = {
        userId:this.$data.store.state.exampleModule.id,
        chatRecordTypeId: 1,
        content: this.$data.msg,
        sendUser: this.$data.store.state.exampleModule.id,
        friendId: this.$data.store.state.exampleModule.friendId
      }
      this.$data.ws.send(JSON.stringify(messgae));
      this.msg = ''
    },
    getChatRecord(){
      this.$api.get("/all/chatRecord/"+this.$data.store.state.exampleModule.id+"/"+this.$data.store.state.exampleModule.friendId).then(ref=>{
        this.$data.messages=ref.data.data
      })
    },
    websocketOnmessage(e){
      let reData = e.data;
      console.log("接收到的信息为："+ reData);
    }
  },
  mounted: function () {

    this.$data.ws = new WebSocket("ws://localhost:9999/chat?"+this.$data.store.state.exampleModule.id)
    this.$data.ws.onopen = function () {
      console.log("连接成功")
    }
    const this_ = this
    this.ws.onmessage = function (ev) {
      console.log(ev.data())
      let a = JSON.parse(ev.data);
      const message ={
        readed : 0,
        content:a.content,
        sendUser: a.sendUser
      }
      this_.$data.messages.push(message)
    }
    const readedModel = {
      'userId': this.$data.store.state.exampleModule.id,
      'friendId':this.$data.store.state.exampleModule.friendId,
      'type':0
    }
    this.$api.post("/insert/lastReadTime",readedModel)
  },

  unmounted() {
    const readedModel = {
      'userId': this.$data.store.state.exampleModule.id,
      'friendId':this.$data.store.state.exampleModule.friendId,
      'type':1
    }
    this.$api.post("/insert/lastReadTime",readedModel)
  },
  created() {
    this.getChatRecord();
  }
}
</script>

<style scoped>

</style>
