<template>
  <div class = 'slider-wrapper'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'sliderwrapper',
}
</script>

<style lang='scss'>
.slider-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  max-width: 70%;
  max-height: 70%;
  border: 1px solid black;
  position: absolute;
}
</style>
