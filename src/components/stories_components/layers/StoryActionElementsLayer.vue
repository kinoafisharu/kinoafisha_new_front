<template>
  <AELWrapper>
    <transition name = 'fade'>
      <component  :is = 'currentLayer'
                  v-bind = 'currentProperties'
                  @close = 'flushLayers'>
      </component>
    </transition>

    <!--Кнопка рейтинга, включает модальное окно с настройками рейтинга-->
    <RateButton :ratecalced = 'ratecalced' @click.native = 'onClickRateSettingsButton'/>

    <!-- Uslovnoe otobrazhenie nizhney chasti -->
    <AELBottomSectionWrapper id = 'bottom-section'>
      <LittleRoundButton class = 'info-place'
                          v-on:click.native="onClickInfoButton"
                          buttonimagesource = 'info.png'/>

                          <!-- LIKE BUTTON ON CODDITION: MAIN WINDOW -->
      <LittleRoundButton  v-on:click.native = 'onClickLikeButton'
                                              class="rate-button"
                                              :buttonspantext = 'dataLikes'
                                              buttonimagesource = "like.png"
                                              v-if = 'show_rate_layer_buttons'/>
      <!-- INFO BLOCK BUTTONS =============================================== -->

      <!-- AUTH BUTTON ON CONDITION: SHOW INFO -->
      <LittleRoundButton v-if = "show_second_layer_buttons"
                          class = 'auth-button'

                          buttonimagesource = "key.png"/>

      <!-- TICKETS BUTTON -->
      <LittleRoundButton v-if = "show_second_layer_buttons"
                          class = 'tickets-button'

                          buttonimagesource = "ticket.png"/>

      <!-- SETTINGS BUTTON -->
      <SettingsButton v-if = "show_second_layer_buttons"
                          class = 'settings-button'
                          buttonimagesource = "settings.png"/>


      <!-- ================================================================== -->


      <!-- DISLIKE BUTTON ON CONDITION: MAIN WINDOW -->
      <LittleRoundButton
                          class="rate-button"
                          @click.native = "onClickDislikeButton"
                          :buttonspantext = 'dataDislikes'
                          buttonimagesource = "dislike.png"
                          v-if = 'show_rate_layer_buttons'/>

    </AELBottomSectionWrapper>



    <!-- Sekcii wsplivaushih okon laikov -->
    <transition name = 'fade'>
      <component :is = 'currentSection' @give-like = 'giveLike'
                                        @close-like-section = 'flushSections'
                                        @close-dislike-section = 'flushSections'
                                        v-bind = 'sectionProperties'>

      </component>
    </transition>
  </AELWrapper>
</template>

<script>
// Слой активных элементов для постера kinoinfo
// Берет описанные ниже пропсы, список слоев необходимо описать в Data (layers) в порядке их переключения
// Используются динамические компоненты (слои)
import SettingsButton from "@/components/global/buttons/SettingsButton"
import SettingsModal from "@/components/global/layers/SettingsModal"
import ThirdLayer from "@/components/global/layers/ThirdLayer"
import DislikeSectionTwoChoices from "@/components/global/buttons/button_sections/DislikeSectionTwoChoices"
import LikeSectionThreeChoices from "@/components/global/buttons/button_sections/LikeSectionThreeChoices"
import LittleRoundButton from "@/components/global/buttons/LittleRoundButton"
import RateButton from "@/components/global/buttons/RateButton"
import InfoLayer from "@/components/global/layers/InfoLayer"
import AELWrapper from "@/components/global/wrappers/AELWrapper"
import AELBottomSectionWrapper from "@/components/global/wrappers/AELBottomSectionWrapper"
import LayerMixin from "@/mixins/LayerMixin"
import SectionMixin from "@/mixins/SectionMixin"
import RateMixin from "@/mixins/RateMixin"
import ActionElementsLayerMixin from "@/mixins/ActionElementsLayerMixin"
export default {
  name: 'action-elements-layer',
  components: {
    SettingsButton,
    LikeSectionThreeChoices,
    DislikeSectionTwoChoices,
    LittleRoundButton,
    ThirdLayer,
    InfoLayer,
    SettingsModal,
    AELWrapper,
    AELBottomSectionWrapper,
    RateButton,
  },
  mixins: [LayerMixin, SectionMixin, RateMixin, ActionElementsLayerMixin],
  props: {
    tohtml: [Boolean, String],
    rate: [Number, String],
    title: String,
    genre: Array,
    description: String,
    likes: [Number, String],
    dislikes: [Number, String],
    id: [Number, String],
    sectionConfig: Object,
  },
  data() {
    return {
      dataLikes: this.likes,
      dataDislikes: this.dislikes,
    }
  },
  computed: {
    currentProperties: function() {
        return { title: this.title, genre: this.genre, year: this.year, description: this.description, country: this.country, tohtml: this.tohtml, }
    },
    sectionProperties: function() {
        return {sectionConfig: this.sectionConfig}
      },
    ratecalced: function() {
      if (this.rate) {
        let r = this.rate
        let rc = Math.round(r / 2 + 1)
        if (rc > 5) rc = 5;
        else if (rc == 1) rc = 2;
        if (r == 0) return r;
        else return rc;
    } else {
      return '0'
    }
    }
  },

}
</script>

<style scoped lang='scss'>


.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

</style>
