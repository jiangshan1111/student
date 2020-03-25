import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/public.css'
import './assets/css/icon.css'
import './assets/css/init.css'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import axios from 'axios'

Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
