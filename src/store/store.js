import Vue from 'vue'
import Vuex from 'vuex'
import service from "@/api/base.js"
Vue.use(Vuex)

// Самый главный компонент, тут же хранилище Vuex
const store = new Vuex.Store({
    state: {
        films: [{'name': '..loading'}],
        film: {'limit': 'loading'},
        story: {'title': 'loading', 'description': 'loading'},
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
        async getFilms ({commit}, payload) {
            await service.get('kinoinfo/films/?format=json', {params: {page: payload.currentPage, page_size: payload.page_size}})
                .then((res) => {
                    let films = res.data.results
                    commit('setFilms', films)
                })
        },
        async getFilm ({commit}, payload) {
          await service.get(`kinoinfo/films/${payload.id}/`)
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
        async getStories ({commit}, payload) {
          await service.get('texts/stories/', {params: {page: payload.currentPage}})
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
