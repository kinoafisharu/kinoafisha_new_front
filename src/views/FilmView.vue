<template>
  <div class="Film">
    <FilmPoster :id="id"></FilmPoster>
  </div>
</template>

<script lang="ts">
import FilmPoster from "../components/FilmPoster/FilmPoster.vue"
import {Component, Prop, Vue} from "vue-property-decorator"

@Component({
  components: {
    FilmPoster
  }
})
export default class FilmView extends Vue {
  @Prop() private id!: number
}
</script>

<style scoped lang="scss">
@media (orientation: portrait) {
  .Film {
    flex-direction: column;
  }
}

@media (orientation: landscape) {
  .Film {
    flex-direction: row;
  }
}

.Film {
  display: flex;
  height: 100%;
  width: 100%;
}
</style>
