<template>
  <div class = 'icon-arrow'>
    <img class = 'arrow-buttonimg' :src = "`${publicPath}images/arrow.png`">
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
.arrow-buttonimg {
  max-width: 100%;
  max-height: 100%;
}
.icon-arrow {
  opacity: 0.1;
}
.icon-arrow:hover {
  opacity: 0.9;
}

</style>
