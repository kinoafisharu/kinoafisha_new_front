import App from './App.vue'
import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from '@/store/store.js'
import router from "@/router/router.js"
import vuetify from "@/plugins/vuetify.js"
Vue.use(Vue2TouchEvents)
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
Vue.use(VueLodash, { name: 'custom' , lodash: lodash })

// Входная точка
// ======================================================================================||||
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
