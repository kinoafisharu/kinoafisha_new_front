<template>
    <div class="Film">
        <Poster :id=id></Poster>
    </div>
</template>

<script>
import Poster from '../components/Poster'
export default {
  name: 'Film',
  props: ['id'],
  components: { Poster },
}
</script>

<style scoped>

</style>
