<template>
    <div class="poster">
        <img :src="posterImgUrl" class="poster-image" alt="Постер фильма" />
        <div id="action-elements-layer">
            <div class="rate rate-5">5</div>
            <div id="bottom-section">
                <div class="rate-button" id="like">
                    <img src="../../assets/like.png" alt="like" />
                    <span>3</span>
                </div>
                <div class="rate-button" id="dislike">
                    <img src="../../assets/like.png" alt="dislike" />
            
                    <span>4</span>
                </div>
                <div id="age-restriction">14+</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component
export default class FilmPoster extends Vue {
    @Prop({
        required: true,
        type: Number,
        validator: (id: number) => id > 0
    })
    private id!: number

    // Собирает нужный URL постера по id фильма
    get posterImgUrl(): string {
        let id = this.id
        let thousand = Math.trunc(id / 1000) + 1 // какая тысяча. используется в URL.
        return (
            "http://posters.kinoafisha.ru/" + thousand + "/" + id + "-001.jpg"
        )
    }
}
</script>

<style scoped lang="scss">
@import "FilmPoster";
</style>
