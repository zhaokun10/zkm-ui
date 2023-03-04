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
        })
      }else {
        this.$axios.post("http://localhost:7999/register?userame="+this.$data.formData.name+"&password="+this.$data.formData.password+"&email="+this.$data.formData.email)
      }
    }
  }
}
</script>

<style scoped>

</style>
