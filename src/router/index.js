import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '../views/recommend/recommend'
import Singer from '../views/singer/singer'
import SingerDetail from '../views/singer-detail/singer-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
    },
    {
      path: '/singer',
      component: Singer,
      children:[
        {
          path:':id',
          component:SingerDetail
        }
      ]
    },
    {
      path: '/singer-detail',
      component: SingerDetail,
    },
  ]
})
