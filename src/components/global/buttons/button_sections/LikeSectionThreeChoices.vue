<template>
  <div id="like-section">
    <LittleRoundButton v-if = '!sectionConfig.excfirstOption' class = 'image' @click.native = 'emitParentLikeFunction(1, sectionConfig.likepath)'
                        :buttonimagesource = 'sectionConfig.buttonimage1'
                        :buttonspantext = 'sectionConfig.spantext1'/>

    <LittleRoundButton v-if = '!sectionConfig.excsecondOption' class = 'image' @click.native = 'emitParentLikeFunction(2, sectionConfig.likepath)'
                        :buttonimagesource = 'sectionConfig.buttonimage2'
                        :buttonspantext = 'sectionConfig.spantext2'/>

    <LittleRoundButton v-if = '!sectionConfig.excthirdOption' class = 'image' @click.native = 'emitParentLikeFunction(3, sectionConfig.likepath)'
                        :buttonimagesource = 'sectionConfig.buttonimage3'
                        :buttonspantext = 'sectionConfig.spantext3'/>

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
    sectionConfig: Object,
  },
  methods: {
    emitParentLikeFunction: function(val, path) {
      this.$emit('give-like', val, path)
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
