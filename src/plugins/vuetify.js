import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
//плагин
Vue.use(Vuetify)

const opts = {
  icons: {
    iconfont: 'mdiSvg',
  }
}

export default new Vuetify(opts)
