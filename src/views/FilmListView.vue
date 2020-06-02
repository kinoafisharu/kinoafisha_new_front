<template>
  <div id="filmlistview">
    <FilmList
      :filmdata = 'films'
    />
  </div>
</template>

<script>
import FilmList from '@/components/FilmList'
export default {
  name: 'filmlistview',
  // call to getFilms method,receiving, caching container
  mounted () {
        this.$store.dispatch('getFilms')
    },
  // computed value of films container
    computed: {
      films () {
        console.log(this.$store.getters.films)
        return this.$store.getters.films
      }
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
