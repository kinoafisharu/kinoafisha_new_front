import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import service from "@/api/base.js"
import router from "@/router/router.js"
Vue.use(Vuex)

// Самый главный компонент, тут же хранилище Vuex
const store = new Vuex.Store({
    state: {
        films: ['loading',],
        stories: ['loading',],
    },
    getters: {
        films: state => {
            return state.films
        },
        stories: state => {
            return state.stories
        },
    },
    actions: {
        getFilms (context) {
            service.get('kinoinfo/films/?format=json')
                .then((res) => {
                    let films = res.data.results
                    context.commit('setFilms', films)
                })
        },
        getStories ({commit}, payload) {
          service.get(`texts/stories/orderby/?by=${payload.by}&amount=${payload.amount}`)
            .then(res => {
                let stories = res.data
                commit('setStories', stories)
            })
        }
    },
    mutations: {
        setFilms (state, films) {
            state.films = films
        },
        setStories (state, stories) {
          console.log(stories)
          state.stories = stories
        }
    }
})
// ======================================================================================||||

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
