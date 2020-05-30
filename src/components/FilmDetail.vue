<template>
  <div class = 'poster-block'>


          <ActionPosterImage
          v-if = "film !== null"
          :kid = 'film.kid'
          :limit = 'film.limits'
          :title = 'film.name[0].name'
          :flikes = 'film.likes'
          :rate = 'film.imdb_rate'
          :description = 'film.description'
          :persons = 'film.persons'
          :year = 'film.year'
          :country = 'film.country'
          :votes = 'film.imdb_votes'
          :release = 'film.release'
          :genre = 'film.genre'
          />


          <p v-else-if = 'loading === true'>loading...</p>
          <p v-if = 'errored === true'> ERROR occured in FilmDetail component </p>
  </div>
</template>

<script>
  import service from "@/api/base.js"
  import ActionPosterImage from "@/components/ActionPosterImage.vue"
  export default {
    name: 'filmdetail',
    components: {
      ActionPosterImage
    },
    //id received from router CHAIN |- FIlmDetailView => FilmDetail => FilmPoster
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
   //FETCH DATA FROM API USING GIVEN ID PROP
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
}

</script>

<style>
.poster-and-info-block {
  width: inherit;
  height: inherit;
}

</style>
