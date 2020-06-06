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
        film: {'limit': 'loading'},
        story: {'title': 'loading', 'description': 'loading'},
    },
    getters: {
        films: state => {
            return state.films
        },
        story: state => {
            return state.story
        },
        film: state => {
          return state.film
        }
    },
    actions: {
        getFilms (context) {
            service.get('kinoinfo/films/?format=json')
                .then((res) => {
                    let films = res.data.results
                    context.commit('setFilms', films)
                })
        },
        getFilm ({commit}, payload) {
          service.get(`kinoinfo/films/${payload.id}/`)
            .then((res) => {
              let film = res.data
              commit('setFilm', film)
            })
        },
        getStory ({commit}, payload) {
          service.get(`texts/stories/${payload.id}/`)
            .then(res => {
                let story = res.data
                commit('setStory', story)
            })
        }
    },
    mutations: {
        setFilms (state, films) {
            state.films = films
        },
        setStory (state, story) {
          console.log(story)
          state.story = story
        },
        setFilm (state, film) {
          state.film = film
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
