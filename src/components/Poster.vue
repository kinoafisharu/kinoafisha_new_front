<template>
    <div class="poster">
        <div class="poster-image">
            <img src="http://posters.kinoafisha.ru/12/11111-001.jpg" alt="Постер фильма">
        </div>
        <div class="action-elements-layer">
            {{ id }}
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

    .poster {
        position: relative;

        .poster-image {
            z-index: 1;

            img {
                max-width: 90%;
                border-radius: 10pt;
            }
        }

        .action-elements-layer {
            position: absolute;
            z-index: 2;
            top: 0;
            width: 100%;
            height: 100%;
        }

    }
</style>
