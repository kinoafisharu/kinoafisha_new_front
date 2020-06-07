import App from './App.vue'
import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'
import store from '@/store/store.js'
import router from "@/router/router.js"
Vue.use(Vue2TouchEvents)


// ======================================================================================||||

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
