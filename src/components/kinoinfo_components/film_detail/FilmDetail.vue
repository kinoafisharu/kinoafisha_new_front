<template>
  <div class = 'poster-block'>
          <div class="zoom-button">
            <div class="my-2">
              <v-btn fab x-small dark @click.native = 'onClickZoomButton'>
                <v-icon>mdi-television</v-icon>
              </v-btn>
            </div>
          </div>
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
// Страница с детальным вывоом информации о фильме
// На данный момент просто принимает id фильма из роутера
// и рендерит компонент ActionPosterImage0, оборачивая его в доп. блок
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
    methods: {
      onClickZoomButton: function (){
        this.$emit('zoom')
      }
    },
}

</script>

<style scoped lang='scss'>
.zoom-button {
  position: absolute;
  left: 5%;
  top: 0;
  z-index: 2;
}
.poster-block {
  width: 100%;
  height: 100%;
}

</style>
