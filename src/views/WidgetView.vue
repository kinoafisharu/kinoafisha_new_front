<template>
  <div id="app">
    <Widget :films="films"/>
  </div>
</template>

<script lang="ts">
import Widget from '../components/Widget.vue'
import { FilmModel } from "@/film-model"
import { getFilmsScheduleByСity } from "@/api/film"

export default {
  name: 'App',
  props : {
  },
  components: {
    Widget
  },
  data: function () {
    return {
      films:{}
    }
  },
  mounted() {
    getFilmsScheduleByСity("city")
      .then(response => (this.films = response))
  }
}
</script>

<style>
body {
  margin: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
