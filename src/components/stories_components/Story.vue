<template>
  <ImageFlexibleWrapper :imgsrc = 'imgsrc' class="image-flexible-wrapper">
    <AELWrapper class = 'action-elements-layer-wrapper'>
      <ArrowButton @click.native = 'parentGoRight'/>
      <transition name = 'fade'>
        <h2 id = outertitle v-if = '!currentLayer'>{{this.story.title}}</h2>
      </transition>
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
        <LittleRoundButton @click.native = 'onClickLikeButton' class = 'like-button' buttonimagesource = 'like.png'/>
        <LittleRoundButton @click.native = 'onClickDislikeButton' class = 'like-button' buttonimagesource = 'dislike.png'/>
        <CrossButton class= 'cross-button' v-if = 'currentLayer || currentSection' @click.native = 'onClickCrossButton'/>
      </AELBottomSectionWrapper>
      <component :is = 'currentSection' v-bind = 'sectionProperties'>
      </component>
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
import ArrowButton from "@/components/global/buttons/ArrowButton"
import CrossButton from "@/components/global/buttons/CrossButton"
import LayerMixin from "@/mixins/LayerMixin"
import SectionMixin from "@/mixins/SectionMixin"
import LittleRoundButton from "@/components/global/buttons/LittleRoundButton"
import DislikeSectionTwoChoices from "@/components/global/buttons/button_sections/DislikeSectionTwoChoices"
import LikeSectionThreeChoices from "@/components/global/buttons/button_sections/LikeSectionThreeChoices"
export default {
  name: 'story',
  mixins: [LayerMixin, SectionMixin],
  components: {
    AELWrapper,
    AELBottomSectionWrapper,
    ImageFlexibleWrapper,
    RateButton,
    InfoLayer,
    ArrowButton,
    DislikeSectionTwoChoices,
    LikeSectionThreeChoices,
    LittleRoundButton,
    CrossButton
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
      currentSection: null,
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
    onClickCrossButton: function() {
      this.currentLayer = null
      this.layercounter = null
      this.currentSection = null
    },
    onClickLikeButton: function() {
      this.currentSection = 'LikeSectionThreeChoices'
    },
    onClickDislikeButton: function() {
      this.currentSection = 'DislikeSectionTwoChoices'
    },
    parentGoRight: function() {
      this.$emit('go-right')
    },
    parentGoLeft: function() {
      this.$emit('go-left')
    }
  },
  // // WARNING:  // WARNING: CHANGE STORIES HOLDPLACE TO STORAGE
  // computed value of stories container
  computed: {
    currentProperties: function() {
      return { title: this.story.title, description: this.story.text, tohtml: this.tohtml}
    },
    sectionProperties: function() {
      return {spantext1: 'Прочел, рекомендую', spantext2: 'Хочу прочесть' , spantext4: 'Не буду читать', spantext5: 'Прочел, не рекомендую'}
    }
  }
}
</script>

<style scoped lang='scss'>
.image-flexible-wrapper {
  max-width: 70%;
  max-height: 70%;
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
.rate {
  margin-top: 8%;
}
.icon-arrow {
  cursor: pointer;
  position: absolute;
  width: 10%;
  height: 90%;
  right: 0;
  margin-top: 8%;
  margin-right: 3%;
}
.left-arrow {
  left: 0;
  margin-left: 2.5%;
  transform: rotate(180deg);
}
.title-block-0 {
  margin-left: 37%;
  max-width: 100%;
  max-height: 100%;
  display: flex;
}
.like-button {
  margin-left: 15%;
}
#outertitle {
  color: white;
  right: 0;
  padding: 3%;
  width: 94%;
  position: absolute;
}
#like-section {
  width: 23%;
  top: 69%;
  height: 15%;
}
#dislike-section {
  width: 20%;
  top: 74%;
}
.cross-button {
  margin-left: 13%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
