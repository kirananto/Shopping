import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import OAuthCallback from '@/components/OAuthCallback'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/OAuthCallback',
      name: 'OAuthCallback',
      component: OAuthCallback
    }
  ],
  mode: 'history'
})
