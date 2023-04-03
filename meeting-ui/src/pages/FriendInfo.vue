<template>
  <q-page class="row justify-center">
    <q-card style="width: 50%" class="self-center">
      <div class="row justify-center">
        <h6 class="self-center">个人资料</h6>

      </div>
      <q-form>
        <div class="row justify-center">
          <div class="col-1 self-center">
            <h5>昵称:</h5>
          </div>
          <div class="col-9 self-center">
            <q-input outlined v-model="formData.nickName"  readonly/>
          </div>
        </div>
        <div class=" row justify-center">
          <div class="col-1 self-center">
            <h5>邮箱:</h5>
          </div>
          <div class="col-9 self-center">
            <q-input outlined v-model="formData.email" readonly />
          </div>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import {useStore} from "../store";

export default {
  name: "FriendInfo",
  data(){
    return{
      formData:{
      },
      store: useStore()
    }
  },
  methods:{
    getUserInfo(){
      this.$api.get("/friendInfo?userId=" + this.$data.store.state.exampleModule.friendId).then(ref => {
        this.$data.formData=ref.data.data
      })
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style scoped>

</style>
