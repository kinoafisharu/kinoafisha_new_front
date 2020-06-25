import Vue from 'vue'
import Vuex from 'vuex'
import db from "@/db/idb"
import service from "@/api/base.js"
//import lodash from 'lodash'
Vue.use(Vuex)

// Хранилище Vuex
// Используется для взаимодействия с АПИ и хранения полученной информации
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
        filmbyimdb: state => {
          return state.film
        },
        stories: state => {
          return state.stories
        }
    },
    actions: {
         async getFilms ({dispatch, commit}, payload) {
           var data = [];
           let sorting = payload.ordering
           if (!payload.datetime) {
             for (var i = 0; i < sorting.length; i++){
                  data.push(sorting.charCodeAt(i));
              }
              var id = payload.currentPage + data.join('')
              var films = await db.getFilms(id)
            }
           if (films) {
             commit('setFilms', films)
             console.log('got from db');
             console.log(films);
           } else {
           console.log(payload);
            return service.get(`kinoinfo/films/`, {params: {page: payload.currentPage,
                                                                              page_size: payload.page_size,
                                                                              values: payload.values,
                                                                              ordering: payload.ordering,
                                                                              search: payload.search,
                                                                              datetime: payload.datetime}})
                .then((res) => {
                    let films = res.data.results
                    dispatch('addFilmsToDb', {id: id, films: films})
                })
              }
        },
        getFilmByImdb ({commit}, payload) {
          return service.get(`kinoinfo/films/?values=${payload.values}&imdb_id=${payload.id}`)
            .then((res) => {
              console.log(res);
              let film = res.data.results[0]
              console.log(film)
              commit('setFilmByImdb', film)
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
            return service.get(`texts/stories/`, {params: {page: payload.currentPage,
                                                          ordering: payload.ordering,
                                                            values: payload.values}})
            .then(res => {
              let stories = res.data.results
              console.log(stories)
              commit('setStories', stories)
            })

        },
        addFilmsToDb ({ commit }, payload) {
          commit('setFilms', payload.films)
          return db.saveFilms(payload.films, payload.id)
        },
        deleteFilmsFromDb ({ films }) {
          return db.deletefilms(films)
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
        setFilmByImdb (state, film) {
          state.film = film
        },
        setStories (state, stories) {
          state.stories = stories
        },
    }
})

export default store
