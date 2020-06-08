<template>
  <div class = 'bottom-block'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'bottom-block'
}
</script>

<style lang ='scss'>
.bottom-block {
  bottom: 0;
  position: absolute;
  height: 10%;
}
</style>
