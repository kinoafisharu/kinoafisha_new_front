<template>
  <div id="action-elements-layer">
    <transition name = 'fade'>
      <component  :is = 'currentLayer'
                  v-bind = 'currentProperties'
                  @close = 'flushLayers'>
      </component>
    </transition>
    <!--Кнопка рейтинга, включает модальное окно с настройками рейтинга-->
    <div class='rate' :class="'rate_color_'+ ratecalced" @click="onClickRateSettingsButton" title = 'Show settings'>
      <!-- Отображение рейтинга если такой есть -->
      <a>{{ratecalced}}</a>
    </div>

    <!-- Uslovnoe otobrazhenie nizhney chasti -->
    <div id="bottom-section">
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

      <!-- AGE RESTRICTION IF EXISTS -->
      <a v-if = 'ageRestriction' id="age-restriction">{{ageRestriction}}</a>
    </div>



    <!-- Sekcii wsplivaushih okon laikov -->
    <transition name = 'fade'>
      <component :is = 'currentSection' @give-like = 'giveLike'
                                        @close-like-section = 'flushSections'
                                        @close-dislike-section = 'flushSections'>

      </component>
    </transition>
  </div>
</template>

<script>
import service from "@/api/base.js"
import SettingsButton from "@/components/SettingsButton"
import SettingsModal from "@/components/SettingsModal"
import ThirdLayer from "@/components/ThirdLayer"
import DislikeSectionTwoChoices from "@/components/DislikeSectionTwoChoices"
import LikeSectionThreeChoices from "@/components/LikeSectionThreeChoices"
import LittleRoundButton from "@/components/LittleRoundButton"
import FilmInfo from "@/components/FilmInfo"
export default {
  name: 'action-elements-layer',
  components: {
    SettingsButton,
    LikeSectionThreeChoices,
    DislikeSectionTwoChoices,
    LittleRoundButton,
    ThirdLayer,
    FilmInfo,
    SettingsModal,
  },
  props: {
    limit: String,
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
  },
  data() {
    return {
      layers:[null,'FilmInfo', 'ThirdLayer'],
      layercounter: 0,
      currentLayer: null,
      currentSection: null,
      dataLikes: this.likes,
      dataDislikes: this.dislikes,
      show_like_section: false,
      show_rate_layer_buttons: true,
    }
  },
  methods: {
    onClickInfoButton: function() {
      this.layercounter ++
      if (this.layercounter === this.layers.length) {
        this.layercounter = 0
        this.show_rate_layer_buttons = true
        this.show_second_layer_buttons = false
      } else {
        this.show_rate_layer_buttons = false
        this.show_second_layer_buttons = true
      }
      this.currentLayer = this.layers[this.layercounter]
      this.currentSection = null


    },
    onClickLikeButton: function() {
      this.currentSection = 'LikeSectionThreeChoices'
    },
    onClickDislikeButton: function() {
      this.currentSection = 'DislikeSectionTwoChoices'
      console.log('awdawd')
    },
    onClickRateSettingsButton: function() {
      this.currentLayer = 'SettingsModal'
      this.layercounter = 0
    },
    chooseLayer: function(val) {
      this.currentLayer = this.layers[val]
    },
    flushLayers: function() {
      this.layercounter = 0
      this.currentLayer = null
    },
    flushSections: function() {
      this.currentSection = null
    },

    /* Две функции голоса ниже почти одинаковые, берут целочисленное значение
     и на его основе отправляют нужный запрос по лайку или дизлайку в апи */
    // В будущем переделать на абстракцию!!
    giveLike: function(evaluation) {
      console.log(evaluation)
      this.show_like_section = !this.show_like_section
      if (this.like_given) {
        console.log("Can't give like, you've already voted")
      } else {
      console.log("give_like")
      service.post(`films/${this.id}/like/`, {
          evaluation: evaluation,
        })
        .then((response) => {
          if (response.data['liked'] == true) this.like_given = true
        })
        .catch((error) => {
          console.log(error)
        })
        this.dataLikes ++
      }
    },

  },
  computed: {
    currentProperties: function() {
        return { title: this.title, genre: this.genre, year: this.year, description: this.description, country: this.country }
    },
    ageRestriction: function() {
      let numberPattern = /\d+/g;
      let age = this.limit.match(numberPattern)[0] + '+'
      return age

    },
    ratecalced: function() {
      let r = this.rate
      let rc = Math.round(r / 2 + 1)
      if (rc > 5) rc = 5;
      else if (rc == 1) rc = 2;
      if (r == 0) return r;
      else return rc;
    }
  },

}
</script>

<style scoped lang='scss'>

#action-elements-layer {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
}
filminfo {
    z-index: 2;
}
.rate {
    cursor: pointer;
    display: flex;
    border-top-right-radius: 38%;
    border-bottom-right-radius: 38%;
    padding-left: 4%;
    padding-right: 7%;
    color: black;
    align-self: flex-start;
    margin-top: 14%;
    font-size: 4em;
    padding-bottom: 1%;
    padding-top: 4%;
    color: black;
    font-weight: bold;
}
.rate_color_0 {
    background: rgba(255, 250, 250, 0.8);
    color: #333;
}
.rate_color_2 {
    background: rgba(94, 2, 2, 0.8) !important;
    color: #5C124A;
}
.rate_color_3 {
    background: rgba(255, 218, 185, 0.8) !important;
    color: #4C2E0F;
}
.rate_color_4 {
    background: rgba(126, 192, 238, 0.8) !important;
    color: #002E4C;
}
.rate_color_5 {
    background: rgba(60, 179, 113, 0.8) !important;
    color: #002E00;
    color: black;
}
#bottom-section {
    height: 6%;
    background: rgba(84, 93, 112, 0.4);
    color: white;
    padding: 2%;
    display: flex;
    .info-place {
        width: 10%;
        padding: 1%;
        border-right: double 1px #757575;
    }
    .rate-button {
        padding: 1%;
        display: flex;
        width: 10%;
        margin-left: 10%;
        margin-right: 11%;
        span {
            font-size: 1.5em;
            margin-left: 20%;
        }
      }
      .dislike-button {
          padding: 1%;
          display: flex;
          width: 10%;
          margin-left: 20%;
          margin-right: 11%;
          span {
              font-size: 1.5em;
              margin-left: 20%;
          }
        }

    .auth-button {
        cursor: pointer;
        display: flex;
        width: 9%;
        margin-left: 10%;
        margin-right: 4%;
        background-color: white;
        opacity: 0.7;
        border-radius: 20%;
        .icon {
            color: white;
            height: 100%;
        }
    }
    .tickets-button {
        cursor: pointer;
        padding: 1%;
        display: flex;
        width: 6.5%;
        background-color: white;
        opacity: 0.7;
        border-radius: 20%;
        margin-left: 3%;
        margin-right: 11%;
        .icon {
            height: 95%;
        }
        .icon:hover {
            height: 105%;
        }
    }
    .settings-button {
      cursor: pointer;
      display: block;
      background-color: black;
      opacity: 0.7;
      border-radius: 20%;
      height: 28px;
      width: 28px;
      margin-left: 0%;
      img {
        width: 60px;
        height: 20px;
      }
    }
    #dislike {
        img {
            transform: rotate(0.5turn); // Делаем палец вниз за счет поворота;
        }
    }
    #age-restriction {
        margin-left: 10%;
        text-align: center;
        font-size: 1em;
        background-color: rgba(6, 8, 20, 0.8);
        border-radius: 20%;
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
