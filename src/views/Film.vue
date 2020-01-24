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

<style scoped>

    @media (max-width: 599px) {
        .Film {
            width: 100%;
        }
    }
    @media (min-width: 600px) {
        .Film {
            width: auto;
            height: 100%;
            align-self: flex-start;
        }
    }
</style>
