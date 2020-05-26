<template>
  <div class = 'poster-and-info-block'>
          <FilmPoster v-if = "film !== null" :kid = 'film.kid' :rate = 'film.imdb_rate' :agelimits = '14' :filmlikes = 'film.likes' @click = 'nextFilm'/>
          <p v-else-if = 'loading === true'>loading...</p>
          <p v-if = 'errored === true'> ERROR occured in FilmDetail component </p>
          <FilmInfo/>
  </div>
</template>

<script>
  //experimental import
  //import getFilmById from "@/api/films.js"
  import service from "@/api/base.js"
  import FilmPoster from "@/components/FilmPoster.vue"
  import FilmInfo from "@/components/FilmInfo.vue"
  export default {
    name: 'filmdetail',
    components: {
      FilmInfo,
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

  },
  methods : {
    nextFilm: () => (this.id = this.id ++)
  }
}
</script>

<style>
#poster-and-info-block {

}

</style>
