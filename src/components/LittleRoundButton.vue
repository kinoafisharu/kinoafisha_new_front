<template>
  <div>
    <img class ="icon" :src = "require(`../assets/${buttonimagesource}`)">
    <span>{{buttonspantext}}</span>
  </div>
</template>

<script>
export default {
  name: 'button',
  props: {
    buttonimagesource: String,
    buttonspantext: String,
  },
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
