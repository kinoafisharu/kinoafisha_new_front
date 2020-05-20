import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import service from "@/api/base.js"
import router from "@/router/router.js"
Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        films: [],
    },
    getters: {
        films: state => {
            console.log(state.films)
            return state.films
        },
    },
    actions: {
        getFilms (context) {
            service.get('films/?format=json')
                .then((res) => {
                    let films = res.data.results
                    context.commit('setFilms', films)
                })
        },
    },
    mutations: {
        setFilms (state, films) {
            state.films = films
        },
    }
})
// ======================================================================================||||

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
