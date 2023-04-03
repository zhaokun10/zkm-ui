<template>
<q-form @submit="submitForm">
  <q-input outlined
           v-if="tab == 'register'"
           v-model="formData.email"
           class="q-mb-md"
           label="Email" />
  <q-input outlined
           v-model="formData.username"
           class="q-mb-md"
           label="UserName" />
  <q-input outlined
           v-model="formData.password"
           type="password"
           class="q-mb-md"
           label="Password" />
  <div class="row">
    <q-space></q-space>
    <q-btn
      color="primary"
      type="submit"
      :label="tab" />
  </div>
</q-form>
</template>

<script>
import {useStore} from "../store";
import {Notify} from "quasar";

export default {
  props:['tab'],
  data(){
    return{
      formData:{
        username:'',
        email:'',
        password:''
      },
      store: useStore()
    }
  },
  methods:{
    submitForm(){
      if(this.tab=='login'){
        this.$api.post("/login?username="+this.$data.formData.username+"&password="+this.$data.formData.password).then(ref=>{
          window.localStorage.setItem("token", ref.data.data)
          this.$data.store.commit("exampleModule/changeUserName", this.$data.formData.username)
          this.$router.push('/user')
          this.$q.notify({
            message: 'login success',
            color: 'success',
            position: this.position
          })
        })
      }else {
        const userZkm = {
          'username':this.$data.formData.username,
          'password':this.$data.formData.password,
          'email':this.$data.formData.email
        }
        this.$api.post("http://localhost:7999/register",userZkm).then(ref=>{
          this.tab=
          Notify.create({
            message: 'success',
            color: 'success',
            position: this.position
          })
        })

      }
    }
  }
}
</script>

<style scoped>

</style>
