<template>
<div>
  <ul>
      <FilmListSingleItem v-for = 'film of filmdata' :key = 'film.id' :film = 'film'/>
  </ul>
</div>
</template>

<script>
import FilmListSingleItem from '@/components/FilmListSingleItem'
export default {
  //we need component to now what we send to it
  //name must be the name of v-bind:!name! = '-----'
  props: ['filmdata'],
  components: {
    FilmListSingleItem
  }
}
</script>
