<template>
  <div>
    <img class ="icon" :src = "`${publicPath}images/${buttonimagesource}`"/>
    <span>{{buttonspantext}}</span>
  </div>
</template>

<script>
// Паттерн маленькой круглой кнопки, используется в интерфейсах с крглыми кнопками (пример: постер фильма)
export default {
  name: 'button',
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
.icon {
    height: 95%;
    cursor: pointer;
}
.icon:hover {
    height: 110%;
}
span {
    font-size: 1.5em;
    margin-left: 10px;
}

</style>
