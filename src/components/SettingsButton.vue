<template>
  <div id = 'settingsbutton'>
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
#settingsbutton {
  margin-bottom: 2%;
}
.icon {
    height: 26px;
    width: 26px;
    margin-bottom: 2%;
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
