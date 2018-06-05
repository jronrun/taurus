// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import '@/config'

// import 'material-design-icons/iconfont/material-icons.css'
// import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false
import App from './App'
import router from './router'

import pi from './common/Pi'
global.pi = pi

import i18n from './i18n/'

import http from './common/http'

import Vuetify from 'vuetify'
Vue.use(Vuetify)
import 'vuetify/src/stylus/main.styl'

import helper from "./helper";
i18n.locale = helper.locale()

import './styles/main.styl'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  http,
  components: { App },
  template: '<App/>',
});
