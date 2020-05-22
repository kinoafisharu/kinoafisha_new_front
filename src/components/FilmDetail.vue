<template>
  <div class = 'filmdetail'>
      <FilmPoster v-if = "film !== null" :kid = 'film.kid'/>
      <p v-else-if = 'loading === true'>loading...</p>
      <p v-if = 'errored === true'> ERROR occured in FilmDetail component </p>
  </div>
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
    //id received from router CHAIN |- DetailView - FilmDetail - FilmPoster
    props: {
      id:String,
    },
    /// send id from porps here to receive a film object
    data() {
     return {
       film: null,
       info: null,
       loading: true,
       errored: false
     };
   },
    mounted() {
      let id = String(this.id) + '/'
      service.get('films/' + id, {params: {format: 'json'} })
      .then(response => {this.film = response.data})
      .catch( error => {
        console.log(error)
        this.errored = true
      .finally(() => this.loading = false)
      })
}
  }

</script>

<style>
</style>
