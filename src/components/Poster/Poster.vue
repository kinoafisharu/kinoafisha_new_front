<template>
    <div class="poster">
        <div class="poster-image">
            <img :src=posterImgUrl alt="Постер фильма">
        </div>
        <div id="action-elements-layer">
            <div class="rate rate-5">
                5
            </div>
            <div id="bottom-section">
                <div class="rate-button" id="like">
                    <img src="../../assets/like.png" alt="like">
                    <span>3</span>
                </div>
                <div class="rate-button" id="dislike">
                    <img src="../../assets/like.png" alt="dislike">
                    <span>4</span>
                </div>

                <div id="age-restriction">
                    14+
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Poster',
  props: {
    id: { // id фильма, параметр передается через URL.
      type: Number,
      required: true,
    },
  },
  computed: {
    posterImgUrl: function () { // Собирает нужный URL постера по id фильма
      let id = this.id
      let thousand = Math.trunc(id / 1000) + 1 // какая тысяча. используется в URL.
      return 'http://posters.kinoafisha.ru/' + thousand + '/' + id + '-001.jpg'
    },
  },
}
</script>

<style scoped lang="scss">
    @import "Poster";
</style>
