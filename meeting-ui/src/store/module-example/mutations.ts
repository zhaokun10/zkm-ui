import { MutationTree } from 'vuex';
import { ExampleStateInterface } from './state';

const mutation: MutationTree<ExampleStateInterface> = {
  changeUserName(state, param){
    state.username = param
  },
  changeUserId(state, param){
    state.id = param
  },
  changeFriendName(state, param) {
    state.friendName = param
  },
  changeNickName(state, param) {
    state.nickName = param
  },
  changeOnline(state, param){
    state.online = param
  },
  changeFriendId(state, param){
    state.friendId = param
  }
};

export default mutation;
