<template>
    <div class="Film">
        <Poster :id=id></Poster>
    </div>
</template>

<script>
import Poster from '../components/Poster/Poster'

export default {
  name: 'Film',
  props: ['id'],
  components: { Poster },
}
</script>

<style scoped lang="scss">

    // Mobile portrait
    @media (orientation: portrait) and (max-width: 599px) {
        .Film {
            width: 100%;
        }
    }

    // Desktop landscape
    @media (orientation: landscape) {
        .Film {
            width: auto;
            height: 100%;
            align-self: flex-start;
        }
    }
</style>
