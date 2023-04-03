<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')||$route.fullPath.includes('/userInfo')||$route.fullPath.includes('/friendInfo')"
          @click="back()"
          icon="arrow_back"
          flat
          dense
          label="Back" />
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          to="/friendInfo"
          flat
          dense
          label="friendInfo" />

        <q-btn
          v-if="$route.fullPath.includes('/user')"
          @click="toMeeting()"
          flat
          dense
          label="ToMeeting" />
        <q-toolbar-title class="absolute-center">
          {{title}}
        </q-toolbar-title>

        <q-btn  v-if="store.state.exampleModule.username!=='Login'"
                class="absolute-right q-pr-sm"
                icon="account_circle"
                no-caps
                flat
                dense
                :label="store.state.exampleModule.nickName">
          <q-menu>
            <div class="column no-wrap q-pa-md">
              <q-btn
                color="primary"
                label="UserInfo"
                to="/userInfo"
                push
                size="md"
                v-close-popup
              />
                <q-btn
                  color="primary"
                  label="Logout"
                  push
                  size="md"
                  @click="logout()"
                  v-close-popup
                />
              </div>
          </q-menu>
        </q-btn>

        <q-btn
          v-if="store.state.exampleModule.username==='Login'"
          to='/'
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
          :label="store.state.exampleModule.username" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>


import {useStore} from "../store";

export default {
  name:'MainLayout',
  computed:{
title(){
  let currentPath = this.$route.fullPath;
  if(currentPath=='/')return 'Login'
  else if (currentPath=='/chat') return "Chat"
  else if(currentPath=='/user') return 'Friend'
}
  },
  data(){
    return{
  store:useStore()
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    toMeeting(){
      window.location.href="http://localhost:7999/"
    },
    logout(){
      const data={
        "username":this.$data.store.state.exampleModule.username
      }
      this.$api.post("/user/logout",data).then(ref=>{
        window.localStorage.removeItem("token")
        this.$data.store.commit('exampleModule/changeUserName',"Login")
        this.$router.push('/')
        console.log(ref)
      })
    }

  }
}
</script>
