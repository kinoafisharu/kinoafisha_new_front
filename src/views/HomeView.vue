<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <MainPageComponent msg="Welcome to KinoAfisha"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MainPageComponent from '@/components/MainPageComponent.vue'

export default {
  name: 'home',
  components: {
    MainPageComponent
  }
}
</script>
