import Vue from 'vue'
import Router from 'vue-router'
import Users from '@/views/Users/Users'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Users',
      component: Users
    }
  ]
})
