import Vue from 'vue'
import Vuex from 'vuex'
import service from "@/api/base.js"
Vue.use(Vuex)

// Самый главный компонент, тут же хранилище Vuex
const store = new Vuex.Store({
    state: {
        films: [],
        film: {'limit': 'loading'},
        story: {'title': 'loading', 'text': 'loading'},
        stories: [null],
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
        },
        stories: state => {
          return state.stories
        }
    },
    actions: {
         getFilms ({commit}, payload) {
            return service.get(`kinoinfo/films/${payload.action}/`, {params: {page: payload.currentPage,
                                                                              page_size: payload.page_size,
                                                                              values: payload.values,
                                                                              ordering: payload.ordering}})
                .then((res) => {
                    let films = res.data.results
                    console.log(films);
                    commit('setFilms', films)
                })
        },
        getFilm ({commit}, payload) {
          return service.get(`kinoinfo/films/${payload.id}/`)
            .then((res) => {
              let film = res.data
              console.log(film)
              commit('setFilm', film)
            })
        },
        getStory ({commit}, payload) {
          service.get(`texts/stories/${payload.id}/`)
            .then(res => {
                let story = res.data
                commit('setStory', story)
            })
        },
       getStories ({commit}, payload) {
            return service.get(`texts/stories/${payload.action}/`, {params: {page: payload.currentPage,
                                                                          ordering: payload.ordering,
                                                                          values: payload.values}})
            .then(res => {
              let stories = res.data.results
              console.log(stories)
              commit('setStories', stories)
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
        },
        setStories (state, stories) {
          state.stories = stories
        }
    }
})

export default store
