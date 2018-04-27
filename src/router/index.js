import Vue from 'vue';
import Router from 'vue-router';
import Laura from '@/components/Laura';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Laura',
      component: Laura,
    },
  ],
});
