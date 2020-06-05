<template>
    <FilmDetail :id = 'id'/>
</template>

<script>
// Страница с детальным отображением для фильма, пока просто рендерит FilmDetail
  import FilmDetail from "@/components/kinoinfo_components/film_detail/FilmDetail.vue"
  export default {
    name: 'filmdetailview',
    //id receieved from router
    props: {
      id: String,
    },
    components:{
      FilmDetail
    }
  }

</script>

<style lang = 'scss'>
.film-detail-view {
  display: flex;
}
</style>
