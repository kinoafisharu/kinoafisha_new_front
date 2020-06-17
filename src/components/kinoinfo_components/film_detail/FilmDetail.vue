<template>
  <div class = 'poster-block'>
        <div class = 'zoom-button'>
              <v-btn
                dark
                fab
                x-small
                color="secondary"
                @click = 'showMainLayoutOverlay'
              >
            <v-icon>mdi-magnify</v-icon>
              </v-btn>
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
// На данный момент принимает обьект фильма
// и рендерит компонент ActionPosterImage, оборачивая его в доп. блок
  import ActionPosterImage from "@/components/kinoinfo_components/action_poster/ActionPosterImage.vue"
  import { bus } from "@/bus/bus.js"
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
        overlay: false,
      }
    },
    methods: {
      showMainLayoutOverlay: function() {
        bus.$emit('overlay', this.obj)
      },
      activateButton: function() {
        this.zoomActive = !this.zoomActive
      }
    }
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
