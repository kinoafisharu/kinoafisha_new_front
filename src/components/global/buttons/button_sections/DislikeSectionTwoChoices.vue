<template>
  <div id="dislike-section">
    <LittleRoundButton class='image'
         @click.native = 'emitParentLikeFunction(4, sectionConfig.likepath)'
         :buttonimagesource = 'sectionConfig.buttonimage4'
         :buttonspantext = 'sectionConfig.spantext4'/>
    <LittleRoundButton class='image'
        @click.native = 'emitParentLikeFunction(5, sectionConfig.likepath)'
        :buttonimagesource = 'sectionConfig.buttonimage5'
        :buttonspantext = 'sectionConfig.spantext5'/>
  </div>
</template>

<script>
import LittleRoundButton from "@/components/global/buttons/LittleRoundButton"
export default {
  name: 'dislike-section-two-choices',
  components: {
    LittleRoundButton,
  },
  props: {
    sectionConfig: Object,
  },
  methods: {
      emitParentLikeFunction: function(val) {
        this.$emit('give-like', val)
        this.$emit('close-dislike-section')
    },
  }
}
</script>

<style scoped lang='scss'>
#dislike-section {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 10%;
  width: 42%;
  background-color: rgba(6, 5, 20, 0.99);
  border-radius: 10%;
  top: 79%;
  padding: 1%;
  left: 55%;
  display: block;
    .image {
      display: flex;
      width: 140px;
      height: 40%;
      margin: 3%;
      font-size: 0.4em;
      color: white;
      text-align: left;
    }
}
</style>
