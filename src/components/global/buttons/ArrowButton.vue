<template>
  <div class = 'icon-arrow'>
    <img class = 'buttonimg' :src = "`${publicPath}images/arrow.png`">
  </div>
</template>

<script>
export default {
  name: 'arrow-buttton',
  data () {
  return {
    publicPath: process.env.BASE_URL
  }
}
}
</script>

<style scoped lang='scss'>
.buttonimg {
  max-width: 100%;
  max-height: 100%;
  opacity: 0.1;
}
.buttonimg:hover {
  opacity: 0.7;
}
</style>
