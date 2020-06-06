<template>
  <div id="like-section">
    <LittleRoundButton class = 'image' @click.native = 'emitParentLikeFunction(1)'
                        buttonimagesource = 'film.png'
                        :buttonspantext = 'spantext1'/>

    <LittleRoundButton class = 'image' @click.native = 'emitParentLikeFunction(2)'
                        buttonimagesource = 'computer.png'
                        :buttonspantext = 'spantext2'/>

    <LittleRoundButton class = 'image' @click.native = 'emitParentLikeFunction(3)'
                        buttonimagesource = 'like.png'
                        :buttonspantext = 'spantext3'/>

  </div>
</template>

<script>
import LittleRoundButton from "@/components/global/buttons/LittleRoundButton"
export default {
  name: 'like-section-three-choices',
  components: {
    LittleRoundButton,
  },
  props: {
    spantext1: String,
    spantext2: String,
    spantext3: String,
  },
  methods: {
    emitParentLikeFunction: function(val) {
      this.$emit('give-like', val)
      this.$emit('close-like-section')
  }
}
}
</script>

<style scoped lang='scss'>
#like-section {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 20%;
  width: 60%;
  background-color: rgba(6, 5, 20, 0.99);
  border-radius: 10%;
  top: 69%;
  padding: 1%;
  left: 23%;
  display: block;
    .image {
      display: flex;
      width: 100%;
      height: 24%;
      margin: 3%;
      font-size: 0.4em;
      color: white;
      text-align: left;
    }
}

</style>
