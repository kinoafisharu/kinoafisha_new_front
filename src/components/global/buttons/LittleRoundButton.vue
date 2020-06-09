<template>
  <div>
    <img class ="little-round-button-icon" :src = "`${publicPath}images/${buttonimagesource}`"/>
    <span>{{buttonspantext}}</span>
  </div>
</template>

<script>
// Паттерн маленькой круглой кнопки, используется в интерфейсах с крглыми кнопками (пример: постер фильма)
export default {
  name: 'litte-round-button',
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
.little-round-button-icon {
    height: 95%;
    cursor: pointer;
}
.little-round-button-icon:hover {
    height: 110%;
}
span {
    font-size: 1.5em;
    margin-left: 10px;
}

</style>
