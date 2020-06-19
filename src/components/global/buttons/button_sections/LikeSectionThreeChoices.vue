<template>
  <!-- Набор кнопок лайков, 
  принимает обьект с параметрами,
  рендерит на их основе нужные кнопки -->
  <div id="like-section">
    <LittleRoundButton v-if = '!sectionConfig.excfirstOption' class = 'image' @click.native = 'emitParentLikeFunction(1, sectionConfig.likepath, sectionConfig.id)'
                        :buttonimagesource = 'sectionConfig.buttonimage1'
                        :buttonspantext = 'sectionConfig.spantext1'/>

    <LittleRoundButton v-if = '!sectionConfig.excsecondOption' class = 'image' @click.native = 'emitParentLikeFunction(2, sectionConfig.likepath, sectionConfig.id)'
                        :buttonimagesource = 'sectionConfig.buttonimage2'
                        :buttonspantext = 'sectionConfig.spantext2'/>

    <LittleRoundButton v-if = '!sectionConfig.excthirdOption' class = 'image' @click.native = 'emitParentLikeFunction(3, sectionConfig.likepath, sectionConfig.id)'
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
  justify-content: space-around;
  height: 25%;
  width: 75%;
  background-color: rgba(6, 5, 20, 0.99);
  border-radius: 10%;
  top: 61%;
  padding: 1%;
  left: 13%;
    .image {
      display: flex;
      left: 0;
      width: 100%;
      height: 24%;
      margin: 3%;
      font-size: 0.7em;
      color: white;
      text-align: left;
    }
  ::v-deep .little-round-button-icon {
    width: 20px;
    position: absolute;
  }
  ::v-deep .little-round-button-wrapper {
    position: absolute;
  }
  ::v-deep #little-round-button-span-text {
    position: relative;
    margin-left: 15%;
  }
}

</style>
