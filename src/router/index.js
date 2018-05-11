import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Recommend = ((resolve)=>{
  import('../views/recommend/recommend').then((module)=>{
    resolve(module)
  })
});

const Singer = ((resolve)=>{
  import('../views/singer/singer').then((module)=>{
    resolve(module)
  })
});

const SingerDetail = ((resolve)=>{
  import('../views/singer-detail/singer-detail').then((module)=>{
    resolve(module)
  })
});

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
