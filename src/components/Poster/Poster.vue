<template>
    <div class="poster">
        <div class="poster-image">
            <img src="http://posters.kinoafisha.ru/12/11111-001.jpg" alt="Постер фильма">
        </div>
        <div id="action-elements-layer">
            <div id="rate">
                5
            </div>
            <div id="bottom-section">
                <div class="rate-button" id="like">
                    <img src="../../assets/like.svg" alt="like">
                    <span>3</span>
                </div>
                <div class="rate-button" id="dislike">
                    <img src="../../assets/like.svg" alt="dislike">
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
  props: ['id'],
}
</script>

<style scoped lang="scss">
    @import "Poster";
</style>
