<template>
  <div id="dislike-section">
    <LittleRoundButton class='image'
         @click.native = 'emitParentLikeFunction(4, sectionConfig.likepath, sectionConfig.id)'
         :buttonimagesource = 'sectionConfig.buttonimage4'
         :buttonspantext = 'sectionConfig.spantext4'/>
    <LittleRoundButton class='image'
        @click.native = 'emitParentLikeFunction(5, sectionConfig.likepath, sectionConfig.id)'
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
  justify-content: space-around;
  height: 17%;
  width: 60%;
  background-color: rgba(6, 5, 20, 0.99);
  border-radius: 10%;
  top: 69%;
  padding: 1%;
  left: 20%;
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
