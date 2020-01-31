<template>
    <div class="Film">
        <FilmPoster :id="id"></FilmPoster>

        <p v-if="dataReady">{{ filmEntity.description }}</p>
    </div>
</template>

<script lang="ts">
import FilmPoster from "../components/FilmPoster/FilmPoster.vue"
import {Component, Prop, Vue} from "vue-property-decorator"
import Axios, {AxiosResponse} from 'axios'
import {FilmModel} from "@/film-model"



@Component({
  components: {
    FilmPoster
  }
})
export default class FilmView extends Vue {
  @Prop() private id!: number
  private filmEntity!: FilmModel
  private dataReady = false


  async mounted() {
    let response: AxiosResponse<FilmModel[]> = await Axios.get('http://kinoinfo.ru/api/film/', {
      params: {
        'id': this.id,
        'format': 'json'
      }
    })
    console.log(response)
    this.filmEntity = response.data[0]
    this.dataReady = true
  }
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
