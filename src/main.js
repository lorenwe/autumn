// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import axios from 'axios'
import App from './App'
import VueProgressBar from 'vue-progressbar'

const options = {
  color: '#000000',
  failedColor: '#874b4b',
  thickness: '2px',
  transition: {
    speed: '0.5s',
    opacity: '0.5s'
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)

Vue.config.productionTip = false
Vue.prototype.$ajax = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
