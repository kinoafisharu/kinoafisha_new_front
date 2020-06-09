<template>
  <v-app>
    <div id="app">
      <router-view/>
    </div>
  </v-app>
</template>

<script>
// Главный компонент, принимает текщее значение роутера
export default {
  name: 'App',
}
</script>

<style lang = 'scss'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

}
</style>
