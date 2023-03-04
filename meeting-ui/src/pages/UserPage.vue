<template>
  <q-page class="flex q-pa-md">
    <div class="q-gutter-y-md full-width" style="min-width: 600px">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="bg-grey-3 text-grey-7"
          active-color="primary"
          indicator-color="purple"
          align="justify"
        >
          <q-tab name="friends" label="Friends"/>
          <q-tab name="groups" label="Groups"/>
          <q-tab name="notification" label="Notification"/>
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="bg-grey-7 text-white">
          <q-tab-panel name="friends">
            <div class="text-h6">Friends</div>
            <q-list class="full-width"
                    separator>
              <q-item
                v-for="user in users"
                :key="user.id"
                @click="toChat(user.id, user.username, user.online)"
                clickable
                v-ripple>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white">
                    {{ user.nickName.charAt(0) }}
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ user.nickName }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-badge
                    :color="user.online===1 ? 'light-green-5' : 'grey-4'">
                    {{ user.online === 1 ? 'OnLine' : 'OffLine' }}
                  </q-badge>
                </q-item-section>
                <q-badge align="middle" color="red" floating v-if="user.unReadMessageCount!==0">
                  {{ user.unReadMessageCount }}
                </q-badge>
              </q-item>

              <q-separator/>

            </q-list>
          </q-tab-panel>

          <q-tab-panel name="groups">
            <div class="text-h6">Groups</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="notification">
            <div class="text-h6">add Friend</div>
            <div class="row full-width">
              <q-input outlined v-model="userName" label="UserName"/>
              <q-btn square color="primary" icon="select" @click="findUserByUsername"/>
            </div>
            <q-list class="full-width" v-if="selectUsers.length!==0"
                    separator>
              <q-item
                v-for="user in selectUsers"
                :key="user.id"
                @click="sendAddRequest(user.id)"
                clickable
                v-ripple>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white">
                    {{ user.nickName.charAt(0) }}
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ user.nickName }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-badge
                    :color="user.online===1 ? 'light-green-5' : 'grey-4'">
                    {{ user.online === 1 ? 'OnLine' : 'OffLine' }}
                  </q-badge>
                  <q-btn color="white" text-color="black" label="add friend"/>
                </q-item-section>
              </q-item>

              <q-separator/>

            </q-list>
            <q-list class="full-width" v-if="selectUsers.length===0"
                    separator>
              <q-item
                v-for="(user, index) in allRequest"
                :key="user.id"
                clickable
                v-ripple>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white">
                    {{ user.nickName.charAt(0) }}
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ user.nickName }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-badge
                    :color="user.online===1 ? 'light-green-5' : 'grey-4'">
                    {{ user.online === 1 ? 'OnLine' : 'OffLine' }}
                  </q-badge>
                  <q-btn color="white" text-color="black" label="agree" @click="agreeRequest(user.id,index)"/>
                  <q-btn color="white" text-color="black" label="disagree" @click="disagreeRequest(user.id,index)"/>
                </q-item-section>
              </q-item>

              <q-separator/>

            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>


  </q-page>
</template>

<script>

import {useStore} from "../store";

export default {
  data() {
    return {
      users: [],
      store: useStore(),
      tab: 'friends',
      userName: '',
      selectUsers: [],
      allRequest: []
    }
  },
  methods: {
    toChat(id, username, online) {
      this.$router.push('/chat')
      this.$data.store.commit("exampleModule/changeFriendName", username)
      this.$data.store.commit("exampleModule/changeFriendId", id)
      this.$data.store.commit("exampleModule/changeOnline", online)
    },
    getAllFriendByUserId() {
      let id = '';
      this.$api.get("/userInfo?username=" + this.$data.store.state.exampleModule.username).then(ref => {
        this.$data.store.commit("exampleModule/changeNickName", ref.data.data.nickName)
        id = ref.data.data.id
        this.$data.store.commit("exampleModule/changeUserId", id)
        this.$api.get("/all?userId=" + id).then(ref => {
          this.$data.users = ref.data.data;
          console.log(ref)
        })
      })
    },
    findUserByUsername() {
      this.$api.get("/find/user?username=" + this.$data.userName).then(
        ref => {
          this.$data.selectUsers = ref.data.data;
        }
      )
    },
    findAllAddRequest() {
      this.$api.get("/all/add/friend/notification?friendId=" + this.$data.store.state.exampleModule.id).then(
        ref => {
          console.log(ref)
          this.$data.allRequest = ref.data.data;
        }
      )
    },
    sendAddRequest(friendId) {
      const friendNotificationModel = {
        "userId": this.$data.store.state.exampleModule.id,
        "friendId": friendId,
      }
      this.$api.post("/addFriendsRequest", friendNotificationModel).then(ref => {
        this.$q.notify({
          message: "success",
          color: "green"
        })
      })
    },
    agreeRequest(friendId, index) {
      this.$api.post("/agreeFriendsRequest/"+this.$data.store.state.exampleModule.id+"?userId="+friendId).then(ref => {
        this.$data.allRequest.splice(index)
        this.getAllFriendByUserId();
      })
    },
    disagreeRequest(friendId, index) {
      this.$api.post("/disagreeFriendsRequest/"+this.$data.store.state.exampleModule.id+"?userId="+friendId).then(ref => {
        this.$data.allRequest.splice(index)
        this.getAllFriendByUserId();
      })
    }
  },
  mounted() {
    this.getAllFriendByUserId();
    this.findAllAddRequest()
  }
}

</script>
