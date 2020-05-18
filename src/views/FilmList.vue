
<template>
    <div>
        <ul id="FilmList" v-if = "dataReady">
          <li v-for="item in filmList" :key="item.id">
            {{ item.id }}
            {{ item.year }}
            {{ item.kid }}
            {{ item.imdb_id}}
          </li>
        </ul>
    </div>
</template>

<script lang='ts'>
import { Vue } from "vue-property-decorator"
import Axios, { AxiosResponse } from "axios"
import { getListOfFilms } from "@/api/film"
import { FilmList } from "@/film-model"


export default class FilmList extends Vue {
    private filmList!: FilmList
    private dataReady = false
    
    async mounted() {
        this.filmList = await getListOfFilms()
        this.dataReady = true
    }
}
</script>
