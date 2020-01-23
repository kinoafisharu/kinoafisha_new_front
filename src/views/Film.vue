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
.Film {
    max-width: 20em;
}
</style>
