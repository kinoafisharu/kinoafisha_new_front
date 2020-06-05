<template>
  <ImageFlexibleWrapper :imgsrc = 'imgsrc' class="image-flexible-wrapper">
    <AELWrapper class = 'action-elements-layer-wrapper'>
      <transition name = 'fade'>
        <component  :is = 'currentLayer'
                    v-bind = 'currentProperties'
                    @close = 'flushLayers'>
        </component>
      </transition>
      <RateButton ratecalced ='5'/>
      <AELBottomSectionWrapper class = 'action-elements-layer-bottom-section-wrapper'>
        <div class ='info-place' @click = 'onClickInfoButton'>
          <img class='icon' :src = "`${publicPath}images/info.png`"/>
        </div>
      </AELBottomSectionWrapper>
    </AELWrapper>
  </ImageFlexibleWrapper>
</template>

<script>
// Компонент для отображения истории
import ImageFlexibleWrapper from "@/components/global/wrappers/ImageFlexibleWrapper.vue"
import AELWrapper from "@/components/global/wrappers/AELWrapper.vue"
import AELBottomSectionWrapper from "@/components/global/wrappers/AELBottomSectionWrapper.vue"
import InfoLayer from "@/components/global/layers/InfoLayer"
import RateButton from "@/components/global/buttons/RateButton"
import LayerMixin from "@/mixins/LayerMixin"
export default {
  name: 'story',
  mixins: [LayerMixin,],
  components: {
    AELWrapper,
    AELBottomSectionWrapper,
    ImageFlexibleWrapper,
    RateButton,
    InfoLayer,
  },
  props: {
    story: Object,
  },
  data () {
    return {
      imgsrc: 'https://desktoplux.com/wallpapers/2000/1620/800x500.jpg',
      layercounter: 0,
      tohtml: true,
      layers: [null, 'InfoLayer'],
      currentLayer:  'InfoLayer',
      publicPath: process.env.BASE_URL
    }
  },
  methods: {
    onClickInfoButton: function() {
      this.layercounter ++
      if (this.layercounter === this.layers.length) {
        this.layercounter = 0
        this.show_rate_layer_buttons = true
        this.show_second_layer_buttons = false
      }
      this.currentLayer = this.layers[this.layercounter]
      this.currentSection = null
    },
  },
  // // WARNING:  // WARNING: CHANGE STORIES HOLDPLACE TO STORAGE
  // computed value of stories container
  computed: {
    currentProperties: function() {
      return { title: this.story.title, description: this.story.text, tohtml: this.tohtml}
    }
  }
}
</script>

<style scoped lang='scss'>
.image-flexible-wrapper {
  max-width: 100%;
  max-height: 100%;
}
#bottom-section{
  .info-place {
    cursor: pointer;
    width: 7%;
    height: 76%;
  }
  .icon {
    position: relative;
    width: 60%;
    height: 140%;
  }
}
.infolayer {
  height: 87.6%;
  opacity: 0.99;
}

</style>
