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
        story: {'title': 'loading', 'description': 'loading'},
    },
    getters: {
        films: state => {
            return state.films
        },
        story: state => {
            return state.story
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
