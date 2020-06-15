<template>
  <div class="info-place" title = 'Инфо'>
    <img id = 'info-place-icon' :src = "`${publicPath}images/info.png`">
  </div>
</template>

<script>
//Кнопка инфо, для переключения слоев и прочих действий с информацией
export default {
  name: 'info-button',
  data () {
  return {
    publicPath: process.env.BASE_URL
  }
}
}
</script>

<style scoped lang='scss'>

</style>
