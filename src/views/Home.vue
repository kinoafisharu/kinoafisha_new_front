<template>
  <div class = 'container'>
    <div class="home">
      <router-link :to="{ name: 'films', params: {} }">Films</router-link>
    </div>
  </div>
</template>

<script>
// Домашняя страница
export default {
    name: "home"
}
</script>

<style>
.container {
  margin: 300px;

}
.home {
  width: 200px;
  height: 100px;
  padding-top: 50px;
  position: flex;
  text-align: center;

}
</style>
