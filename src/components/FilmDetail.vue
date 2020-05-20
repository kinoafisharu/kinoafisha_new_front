<template>
  <FilmPoster :id = 'film.kid'/>
</template>

<script>
  //experimental import
  //import getFilmById from "@/api/films.js"
  import service from "@/api/base.js"
  import FilmPoster from "@/components/FilmPoster.vue"
  export default {
    name: 'filmdetail',
    components: {
      FilmPoster
    },
    props: ['id'],
    /// send id from porps here to receive a film object
    data() {
      return {
        film: null
      }
    },
    mounted() {
      let id = this.id + '/'
      service.get('films/' + id, {params: {format: 'json'} })
      .then(response => {this.film = response.data})
}
  }

</script>
