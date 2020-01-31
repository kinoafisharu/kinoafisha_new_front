<template>
    <div class="Film">
        <FilmPoster :id="id"></FilmPoster>

        <p v-if="dataReady">{{ filmEntity.description }}</p>
    </div>
</template>

<script lang="ts">
import FilmPoster from "@/components/FilmPoster/FilmPoster.vue"
import { Component, Prop, Vue } from "vue-property-decorator"
import Axios, { AxiosResponse } from "axios"
import { FilmModel } from "@/film-model"
import { getFilmById } from "@/api/film"

@Component({
    components: {
        FilmPoster
    }
})
export default class FilmView extends Vue {
    @Prop({ required: true }) private id!: number
    private filmEntity!: FilmModel
    private dataReady = false

    async mounted() {
        this.filmEntity = await getFilmById(this.id)
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
