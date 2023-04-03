import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',name:'auth', component: () => import('pages/AuthPage.vue') },
      { path: '/user',name:'user', component: () => import('pages/UserPage.vue') },
      { path: '/chat',name:'chat', component: () => import('pages/ChatPage.vue') },
      { path: '/userInfo',name:'userInfo', component: () => import('pages/UserInfo.vue') },
      { path: '/friendInfo',name:'friendInfo', component: () => import('pages/FriendInfo.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
