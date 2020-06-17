<template>
<div>
  <ul>
      <FilmListSingleItem v-for = 'film of filmdata' :key = 'film.id' :film = 'film'/>
  </ul>
</div>
</template>

<script>
// Ренерит список из компонентов FilmListSingleItem
import FilmListSingleItem from '@/components/kinoinfo_components/film_listing/FilmListSingleItem'
export default {
  //we need component to know what we send to it
  //name must be the name of v-bind: =>name<=   = '-----'
  props: ['filmdata'],
  components: {
    FilmListSingleItem
  }
}
</script>
