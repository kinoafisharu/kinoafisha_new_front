<template>
  <div id = 'settingsbutton'>
    <img class ="settings-button-icon" :src = '`${publicPath}images/${buttonimagesource}`'/>
    <span id = 'settings-button-span'>{{buttonspantext}}</span>
  </div>
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

<style lang='scss'>
#settingsbutton {
  margin-bottom: 2%;
}
.settings-button-icon {
    height: 26px;
    width: 26px;
    margin-bottom: 2%;
    cursor: pointer;
}
.settings-button-icon:hover {
    height: 110%;
}
#settings-button-span {
    font-size: 1.5em;
    margin-left: 10px;
}

</style>
