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
            <q-input outlined v-model="formData.nickName"  />
          </div>
        </div>
        <div class=" row justify-center">
          <div class="col-1 self-center">
            <h5>邮箱:</h5>
          </div>
          <div class="col-9 self-center">
            <q-input outlined v-model="formData.email"  />
          </div>
        </div>
        <div class="row justify-center">
        <q-btn class="col-10 self-center" color="primary" label="保存" @click="updateUserInfo"></q-btn> </div>
      </q-form>
    </q-card>
</q-page>
</template>

<script>
import {Notify} from "quasar";
import {useStore} from "../store";

export default {
  name: "UserInfo",
  data(){
    return{
      formData:{
      },
      store: useStore()
    }
  },
  methods:{
    getUserInfo(){
      this.$api.get("/userInfo?username=" + this.$data.store.state.exampleModule.username).then(ref => {
        this.$data.formData=ref.data.data
      })
    },
    updateUserInfo(){
      this.$api.post("/updateInfo", this.$data.formData).then(ref=>{
        this.getUserInfo()
        this.$q.notify({
          message:"update successFull",
          color:"green",
          position:"top-right"
        })
      })
    }
  },
  created() {
 this.getUserInfo()
  }
}
</script>

<style scoped>
q-card{
margin-top: 40%;
}
.col-10{
  margin-bottom: 4%;
}
</style>
