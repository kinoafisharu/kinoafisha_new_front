<template>
  <div class = 'poster-block'>


          <ActionPosterImage0
          v-if = "film !== null"
          :kid = 'film.kid'
          :limit = 'film.limits'
          :title = 'film.name[0].name'
          :likes = 'film.votes.likes'
          :dislikes = 'film.votes.dislikes'
          :rate = 'film.imdb_rate'
          :description = 'film.description'
          :persons = 'film.persons'
          :year = 'film.year'
          :country = 'film.country'
          :votes = 'film.imdb_votes'
          :release = 'film.release'
          :genre = 'film.genre'
          :id = 'film.id'
          />

          <p v-else-if = 'loading === true'>loading...</p>
          <p v-if = 'errored === true'> ERROR occured in FilmDetail component </p>
  </div>
</template>

<script>
// Страница с детальным вывоом информации о фильме
// На данный момент просто принимает id фильма из роутера
// и рендерит компонент ActionPosterImage0, оборачивая его в доп. блок
  import service from "@/api/base.js"
  import ActionPosterImage0 from "@/components/kinoinfo_components/action_poster/ActionPosterImage0.vue"
  export default {
    name: 'filmdetail',
    components: {
      ActionPosterImage0,
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
      service.get('kinoinfo/films/' + id, {params: {format: 'json'} })
      .then(response => {this.film = response.data})
      .catch( error => {
        console.log(error)
        this.errored = true
      .finally(() => this.loading = false)
      })
  },
}

</script>

<style scoped lang='scss'>
.poster-block {
  width: 100%;
  height: 100%;
}

</style>
