import Vue from 'vue'
import Router from 'vue-router'
import Laura from '@/pages/Laura'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Laura',
      component: Laura,
    },
  ],
})
