<template>
  <div id="filmlistview">
    <FilmList
      v-if = 'filmdata'
      :filmdata = 'filmdata'
    />
    <p v-else>loading...</p>
  </div>
</template>

<script>
// Страница с листингом фильмов, пока что просто рендерит Filmlist  и отправляет ему данные с хранилища Vuex как пропс
import FilmList from '@/components/kinoinfo_components/film_listing/FilmList'
export default {
  name: 'filmlistview',
  // call to getFilms method,receiving, caching container
  data () {
    return {
      filmdata: null,
    }
  },
  async created () {
        await this.$store.dispatch('getFilms', {currentPage: 1})
        let data = await this.$store.getters.films
        this.filmdata = data
    },


  components: {
    FilmList
  }
}


</script>

<style>
#filmlistview {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
