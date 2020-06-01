<template>
  <div class = 'modal'>
    dawdlawpdlawd
    fwafaopwfawf
    awdawfaw

    <div class = 'cross-button' @click = 'onClickCloseButton'>
      <img id ='icon' src="@/assets/cross.png" alt='cross' title = 'Close modal'/>
    </div>

  </div>
</template>

<script>
export default {
  name: 'thirdlayer',
  props: {

  },
  methods: {
    // WARNING: FUNCTION CHANGES PARENT'S COMPONENT DATA
    onClickCloseButton: function() {
      this.$parent.show_third_layer = false
      this.$parent.show_info = false
      this.$parent.show_main_window_menu = true
      this.$parent.show_age = true
    },
  },
  computed: {

  }
}
</script>

<style scoped lang = "scss">
.modal {
  width: inherit;
  height: inherit;
  position: relative;
  left: 0px;
  top: 0px;
  z-index: 2;
  text-align: center;
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
    margin-bottom: 0%;
    opacity: 0.25;
    font-size: 0.7em;
    img {
      cursor: pointer;
      width: 20px;
      height: 20px;
    }
}
</style>
