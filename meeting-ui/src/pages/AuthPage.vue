<template>
<q-page class="flex q-pa-md">
  <q-card class="absolute-center  ">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="login" label="Login" />
      <q-tab name="register" label="Register" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="login">
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
      </q-tab-panel>

      <q-tab-panel name="register">
        <q-form @submit="submitForm">
          <q-input outlined
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
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</q-page>
</template>

<script>


import {useStore} from "../store";
import {Notify} from "quasar";

export default {
  name: "AuthPage",
  data () {
    return {
      tab: 'login',
      formData:{
        username:'',
        email:'',
        password:''
      },
      store: useStore()

    }
  },
  methods: {
    submitForm() {
      if (this.tab == 'login') {
        this.$api.post("/login?username=" + this.$data.formData.username + "&password=" + this.$data.formData.password).then(ref => {
          window.localStorage.setItem("token", ref.data.data)
          this.$data.store.commit("exampleModule/changeUserName", this.$data.formData.username)
          this.$router.push('/user')
          this.$q.notify({
            message: 'login success',
            color: 'success',
            position: this.position
          })
        })
      } else {
        const userZkm = {
          'username': this.$data.formData.username,
          'password': this.$data.formData.password,
          'email': this.$data.formData.email
        }
        this.$api.post("http://localhost:7999/register", userZkm).then(ref => {
          this.tab ="login"
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
