<template>
  <div class = 'modal'>
    dawdlawpdlawd
    fwafaopwfawf
    awdawfaw
    <CrossButton class='cross-button' @click.native = 'close'/>
  </div>
</template>

<script>
import CrossButton from "@/components/CrossButton"
export default {
  name: 'settingsmodal',
  components: {
    CrossButton,
  },
  props: {

  },
  methods: {
    close: function() {
      this.$emit('close')
    },
  },
  computed: {

  }
}
</script>

<style scoped lang = "scss">
.modal {
  width: inherit;
  height: 91.5%;
  overflow-y: auto;
  position: absolute;
  top: 0;
  bottom:0;
  text-align: center;
  background-color: rgba(12, 10, 26, 0.8) !important;
  p {
    color: white;
  }
  h1 {
    color: white;
  }
  h2 {
    color: white;
  }
}
.cross-button {
    position: absolute;
    width: 20px;
    height: 20px;
    left: 0;
    text-align: left;
    bottom: 0;
    margin:5%;
    margin-left: 3.4%;
    margin-bottom: 5%;
    opacity: 0.25;
    img {
      cursor: pointer;
      width: 20px;
      height: 20px;
    }
}
</style>
