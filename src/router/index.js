import Vue from 'vue'
import Router from 'vue-router'
import VirtualMachines from '@/components/VirtualMachines'
import Overview from '@/components/Overview'
import Login from '@/components/Login'
import User from '@/components/User'
import Echarts from '@/components/OverviewBar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/:username',
      name: 'User',
      component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'virtual_machines',
          component: VirtualMachines
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'overview',
          component: Overview
        }
      ]
    }
  ]
})
