import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import service from "@/api/base.js"
import router from "@/router/router.js"
Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        films: [],
        stories: [],
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
            service.get('films/?format=json')
                .then((res) => {
                    let films = res.data.results
                    context.commit('setFilms', films)
                })
        },
        getStories (context) {
          service.get('news/?page=2&format=json')
            .then(res => {
                let stories = res.data.results
                context.commit('setStories', stories)
            })
        }
    },
    mutations: {
        setFilms (state, films) {
            state.films = films
        },
        setStories (state, stories) {
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
