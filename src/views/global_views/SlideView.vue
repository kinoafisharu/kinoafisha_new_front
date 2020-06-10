<template>
<div class = 'slide-view-wrapper'>
  <div class='toggle-component'>
    <v-col
          cols="12"
          sm="3"
          class="py-2"
        >

          <v-btn-toggle
            v-model="toggleData"
            tile
            color="blue-gray"
            group
          >
            <v-btn value="Stories">
              Stories
            </v-btn>

            <v-btn value="Films">
              Films
            </v-btn>

            <v-btn value="Other">
              Other
            </v-btn>
          </v-btn-toggle>
        </v-col>
  </div>
  <FilmSlider :defaultordering = 'filmdefaultordering' defaultapiaction = 'getval' v-if = "toggleData == 'Films'"/>
  <StorySlider :defaultordering = 'storydefaultordering' defaultapiaction = 'getval' v-if = "toggleData == 'Stories'"/>
</div>
</template>
<script>
import FilmSlider from "@/components/kinoinfo_components/film_listing/FilmSlider"
import StorySlider from "@/components/stories_components/story_listing/StorySlider"
export default {
  name: 'slide-view',
  components: {
    FilmSlider,
    StorySlider,
  },
  data () {
    return {
      toggleData: 'Story',
      filmdefaultordering: 'id',
      storydefaultordering: 'id',

    }
  }
}
</script>
<style lang=scss>
.toggle-component {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>
