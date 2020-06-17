import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
//Плагин Vuetify

Vue.use(Vuetify)

const opts = {
  icons: {
    iconfont: 'mdiSvg',
  },
  theme: {
    dark: true,
  },
}

export default new Vuetify(opts)
