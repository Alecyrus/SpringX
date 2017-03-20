// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../theme/index.css'
import store from './vuex/store'
import ElementUI from 'element-ui'
import Icon from 'vue-svg-icon/Icon.vue';


Vue.use(ElementUI);
Vue.component('icon', Icon);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
