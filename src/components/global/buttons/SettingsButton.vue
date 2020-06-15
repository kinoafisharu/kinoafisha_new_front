<template>
    <img class = 'settings-little-button' :src = '`${publicPath}images/${buttonimagesource}`' title = 'Настройки'/>
</template>

<script>
// Кнопка настроек, требуется заменить иконку на пропорциональную
export default {
  name: 'settings-button',
  props: {
    buttonimagesource: String,
    buttonspantext: String,
  },
  data () {
  return {
    publicPath: process.env.BASE_URL
  }
}
}
</script>

<style scoped lang='scss'>
.settings-little-button {
  cursor: pointer;
  width: 11.1%;
  height: 102%;
  margin-left: 2%;
  ::v-deep img {
    width: 99%;
  }
}
</style>
