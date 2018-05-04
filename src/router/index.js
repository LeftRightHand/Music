import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '../views/recommend/recommend'
import Singer from '../views/singer/singer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/recommend'
    },
    // {
    //   path: '/',
    //   component: Recommend
    // },
    {
      path: '/recommend',
      component: Recommend,
    },
    {
      path: '/singer',
      component: Singer,
    },
  ]
})
