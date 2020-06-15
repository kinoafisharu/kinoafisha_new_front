<template>
    <FilmDetail v-if = 'obj' :obj = 'obj'/>
</template>

<script>
// Страница с детальным отображением для фильма, пока просто рендерит FilmDetail
  import FilmDetail from "@/components/kinoinfo_components/film_detail/FilmDetail.vue"
  export default {
    name: 'filmdetailview',
    //id receieved from router
    //id received from router CHAIN |- FIlmDetailView => FilmDetail => FilmPoster
    props: {
      id: [String,Number]
    },
    components: {
      FilmDetail,
    },
    /// send id from porps here to receive a film object
    data() {
     return {
       info: null,
       obj: null,
     }
   },
   //FETCH DATA FROM API USING GIVEN ID PROP
    async created() {
      await this.$store.dispatch('getFilmByImdb',
       {
         id: this.id,
         values: 'id,name,genre,description,votes,kid,country,year,limits,imdb_votes,imdb_rate,persons'
       })
      let obj = await this.$store.getters.filmbyimdb
      console.log(obj);
      this.obj = obj
    },
  }

</script>

<style scoped lang = 'scss'>
.film-detail-view {
  display: flex;
}
</style>
