import { createRouter, createWebHistory } from 'vue-router'
import layout from '../views/Layout/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: layout,
      children: [
        {
          path: '',
          component: () => import('../views/Layout/components/MainComponent/Home.vue')
        },
        {
          path: 'searchschool',
          component: () => import('../views/Layout/components/MainComponent/SearchSchool.vue'),

        },
        {
          path: 'searchmajor',
          component: () => import('../views/Layout/components/MainComponent/SearchMajor.vue')
        },
        {
          path: 'notfindany',
          component: () => import('../views/Layout/components/MainComponent/NotFindAny.vue')
        },
        {
          path: 'news',
          name: 'news',
          component: () => import('../views/Layout/components/MainComponent/News.vue')
        },
        {
          path: 'my',
          component: () => import('../views/Layout/components/MainComponent/My.vue'),
          children: [{
            path: '',
            alias: 'myinfo',
            component: () => import('../views/Layout/components/MainComponent/MyComponent/MyInfo.vue')
          },
          {
            path: 'myform',
            component: () => import('../views/Layout/components/MainComponent/MyComponent/MyForm.vue')
          },
          {
            path: 'myformdetail/:id',
            component: () => import('../views/Layout/components/MainComponent/MyComponent/MyFormDetail.vue')
          },
          {
            path: 'mycollect',
            component: () => import('../views/Layout/components/MainComponent/MyComponent/MyCollect.vue')
          },
          {
            path: 'myvip',
            component: () => import('../views/Layout/components/MainComponent/MyComponent/MyVip.vue')
          },
          {
            path: 'kefu',
            component: () => import('../views/Layout/components/MainComponent/MyComponent/KeFu.vue')
          },
          ]
        },
        {
          path: 'schoolrank',
          component: () => import('../views/Layout/components/MainComponent/schoolRank.vue')
        },
        {
          path: 'fillform',
          component: () => import('../views/Layout/components/MainComponent/fillForm.vue')
        },
      ]
    },
    {
      path: '/login',
      component: () => import('../views/Login/index.vue')
    }
  ]
})

export default router
