<template>
  <!-- Слой активных елементов постера фильма -->
  <AELWrapper ref = 'AELWrapper'>
    <transition name = 'fade'>
      <component  :is = 'currentLayer'
                  v-bind = 'currentProperties'
                  @close = 'closeLayer'>
      </component>
    </transition>

    <!--Кнопка рейтинга, включает модальное окно с настройками рейтинга-->
    <RateButton :imdb_rate = 'rate' :ratecalced = 'ratecalced' @click.native = 'onClickRateSettingsButton'/>

    <!-- Uslovnoe otobrazhenie nizhney chasti -->
    <AELBottomSectionWrapper>
      <LittleRoundButton class = 'info-place'
                          v-on:click.native="onClickInfoButton"
                          buttonimagesource = 'info.png'/>

                          <!-- LIKE BUTTON ON CODDITION: MAIN WINDOW -->
      <LittleRoundButton  v-on:click.native = 'onClickLikeButton'
                                              class="like-button"
                                              :buttonspantext = 'dataLikes'
                                              buttonimagesource = "like.png"
                                              v-if = 'show_rate_layer_buttons'/>
      <!-- INFO BLOCK BUTTONS =============================================== -->

      <!-- AUTH BUTTON ON CONDITION: SHOW INFO -->
      <LittleRoundButton v-if = "show_second_layer_buttons"
                          class = 'auth-button'
                          @click.native = 'chooseLayer(2)'
                          buttonimagesource = "key.png"
                          title = 'Авторизация'/>

      <!-- TICKETS BUTTON -->
      <LittleRoundButton v-if = "show_second_layer_buttons"
                          class="tickets-button"
                          @click.native = 'chooseLayer(2)'
                          buttonimagesource = "ticket.png"
                          title = 'Купить билеты'/>

      <div v-if = 'show_second_layer_buttons' class = 'settings-button'>
          <v-btn icon @click = 'chooseLayer(2)'>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
      </div>

      <!-- ================================================================== -->


      <!-- DISLIKE BUTTON ON CONDITION: MAIN WINDOW -->
      <LittleRoundButton
                          class="dislike-button"
                          @click.native = "onClickDislikeButton"
                          :buttonspantext = 'dataDislikes'
                          buttonimagesource = "dislike.png"
                          v-if = 'show_rate_layer_buttons'/>

      <!-- AGE RESTRICTION IF EXISTS -->
      <p v-if = 'ageRestriction | show_rate_layer_buttons' id="age-restriction">{{ageRestriction}}</p>
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
    tohtml: Boolean,
    limit: [String ,Number],
    rate: Number,
    title: String,
    genre: Array,
    description: String,
    comment: String,
    year: Number,
    country: Array,
    likes: Number,
    dislikes: Number,
    id: Number,
    sectionConfig: Object,
  },
  data() {
    return {
      dataLikes: this.likes,
      dataDislikes: this.dislikes,
    }
  },
  computed: {
    //  Рассчитывает текущие пропы для слоев
    currentProperties: function() {
        return { title: this.title, genre: this.genre, year: this.year, description: this.description, country: this.country, tohtml: this.tohtml, }
    },
    // Рассчитывает пропы для секций
    sectionProperties: function() {
        return {sectionConfig: this.sectionConfig}
      },
    // Фильтрация возраста на основе регулярного выражения
    ageRestriction: function() {
      let numberPattern = /\d+/g;
      if (this.limit) {
        try {
            let age = this.limit.match(numberPattern)[0] + '+'
            return age
        } catch(err) {
          return '99+'
        }
      } else {
        return '12+'
      }

    },
    // Интегральный рейтинг (временная модель)
    ratecalced: function() {
      if (this.rate) {
        let r = this.rate
        let rc = Math.round(r / 2 + 0.3)
        if (rc > 5) rc = 5;
        else if (rc == 1) rc = 2;
        if (r == 0) return r;
        else return rc;
    } else {
      return '0'
    }
    }
  },
  methods: {
    
  }

}
</script>

<style scoped lang='scss'>


::v-deep #bottom-section {
  height: 8.5%;
}

#age-restriction {
  height: 100%;
  width: 9%;
  opacity: 0.8;
}

.tickets-button {
  width: 10% !important;
  height: 79% !important;
  cursor: pointer;
  ::v-deep .little-round-button-icon {
    height: 35px;
    position: absolute;
    width: auto;
    bottom: 1%;
  }
  }

.auth-button {
  width: 10% !important;
  height: 100% !important;
  cursor: pointer;
  ::v-deep .little-round-button-icon {
    height: 34.5px;
    position: absolute;
    width: auto;
    bottom: 1.1%;
  }
}
.settings-little-button {
  cursor: pointer;
  width: 11.1%;
  height: 102%;
  margin-right: 5%;
  ::v-deep img {
    width: 99%;
  }
}




.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

</style>
