export interface ExampleStateInterface {
  prop: boolean;
  username:string;
  id:number;
  friendName:string;
  friendId:number;
  online:number;
  nickName:string;
}

function state(): ExampleStateInterface {
  return {
    prop: false,
    username:'Login',
    id:-1,
    friendName:'',
    friendId:-1,
    online:0,
    nickName:''
  }
}

export default state;
