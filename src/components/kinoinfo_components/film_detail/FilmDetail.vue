<template>
  <!-- рендерит компонент ActionPosterImage, оборачивая его в доп. блок
      в качестве данных о фильме принимает обьект obj -->
  <div class = 'poster-block'>
          <ActionPosterImage
          v-if = "obj"
          :kid = 'obj.kid'
          :limit = "obj.limits ? obj.limits : '0+'"
          :title = "obj.name[0] ? obj.name[0].name : 'No title'"
          :rate = 'obj.imdb_rate'
          :description = 'obj.description'
          :persons = 'obj.persons'
          :likes = 'obj.votes.likes'
          :dislikes = 'obj.votes.dislikes'
          :year = 'obj.year'
          :country = 'obj.country'
          :votes = 'obj.imdb_votes'
          :release = 'obj.release'
          :genre = 'obj.genre'
          :id = 'obj.id'
          />
  </div>
</template>

<script>

  import ActionPosterImage from "@/components/kinoinfo_components/action_poster/ActionPosterImage.vue"

  export default {
    name: 'filmdetail',
    components: {
      ActionPosterImage,
    },
    //obj received from CHAIN |- FIlmDetailView => FilmDetail => FilmPoster
    props: {
      obj: Object,
    },

    data() {
      return {
      }
    },
}

</script>

<style scoped lang='scss'>
.zoom-button {
  position: absolute;
  right: 3%;
  opacity: 0.65;
  bottom: 11.5%;
  z-index: 4;
}
.poster-block {
  width: 100%;
  height: 100%;
}

</style>
