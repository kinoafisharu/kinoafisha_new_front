<template>
  <div little-round-button-wrapper>
    <img class ="little-round-button-icon" :src = "`${publicPath}images/${buttonimagesource}`"/>
    <span id = 'little-round-button-span-text'>{{buttonspantext}}</span>
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


.little-round-button-wrapper {
    position: absolute;
    cursor: pointer;
}
.little-round-button-icon {
  height: auto;
  cursor: pointer;
  flex: 1;
  width: 100%;
}
.little-round-button-icon:hover {
    width: 105%;
}
#little-round-button-span-text {
    font-size: 1em;
    position: absolute;
    margin-left: 10%;
    bottom: 0;
}


</style>
