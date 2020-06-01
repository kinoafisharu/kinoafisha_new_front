<template>
<div class='postercontainer'>
  <transition name = 'fade'>
    <div v-if = 'show_auth_layer' class = 'auth-layer'>
      <AuthWindow/>
    </div>
  </transition>

  <transition name = 'fade'>
    <div v-if = 'show_third_layer' class = 'third-layer'>
      <ThirdLayer/>
    </div>
  </transition>


  <transition name='fade'>
    <div v-if='show_info' class='modal-layer'>
      <FilmInfo :description='description'
                :title='title'
                :rate='rate'
                :comment='comment'
                :year='year'
                :country='country'
                :genre='genre' />
    </div>
  </transition>

  <transition name = 'fade'>
    <div v-if='show_rate_settings' class = 'modal-rate-settings-layer' @click = 'onClickRateSettingsButton'>
        <SettingsModal/>

    </div>
  </transition>



  <div class="poster">

    <!-- Отображение постера елемента если такой есть -->
    <img v-if='imgsrc' class="poster-image" :src="imgsrc">
    <h1 v-else>This element doesn't have an image yet</h1>
    <div id="action-elements-layer">

      <!--Кнопка рейтинга, включает модальное окно с настройками рейтинга-->
      <div class='rate' :class="'rate_color_'+ ratecalced" @click='onClickRateSettingsButton' title = 'Show settings'>

        <!-- Отображение рейтинга если такой есть -->
        <div>{{ratecalced}}</div>
      </div>

      <!-- Uslovnoe otobrazhenie nizhney chasti -->
      <div id="bottom-section">
        <!-- WARNING: INFO BUTTONS FOR DIFFERENT LAYERS -->
        <!-- FIRST LAYER -->
        <div v-if='!show_info & !show_third_layer' class="info-place">
          <img id="icon-info" src="@/assets/info.png" alt="info" @click="onClickInfoButton" />
        </div>
        <!-- SECOND LAYER -->
        <div v-if='show_info' class="info-place">
          <img id="icon-info" src="@/assets/info.png" alt="info" @click="onClickThirdLayerButton" />
        </div>
        <!-- THIRD LAYER -->
        <div v-else-if='show_third_layer' class="info-place">
          <img id="icon-info" src="@/assets/info.png" alt="info" @click="onClickFourthLayerButton" />
        </div>


        <!-- LIKE BUTTON ON CODDITION: MAIN WINDOW -->
        <div v-if = 'show_main_window_menu & !show_info' class="rate-button">
          <img class="icon" src="@/assets/like.png" alt="like" @click="onClickLikeButton" />
          <span>{{dataLikes}}</span>



        <!-- INFO BLOCK BUTTONS =============================================== -->

        <!-- AUTH BUTTON ON CONDITION: SHOW INFO -->

        </div>
        <div v-if = 'show_info' class = 'auth-button' @click = 'onClickAuthButton'>
          <img class ="icon" src="@/assets/key.png" alt="auth" title = 'Авторизация'>
        </div>


        <!-- TICKETS BUTTON -->
        <div v-if = 'show_info' class = 'tickets-button' @click = 'onClickTicketsButton'>
          <img class ="icon" src = "@/assets/ticket.png" alt="tickets" title = 'Купить билеты'>
        </div>

        <!-- SETTINGS BUTTON -->
        <div v-if = 'show_info' class = 'settings-button' @click = 'onClickSettingsButton'>
          <img class ="icon" src = "@/assets/settings.png" alt="tickets" title = 'Settings'>
        </div>


        <!-- ================================================================== -->


        <!-- DISLIKE BUTTON ON CONDITION: MAIN WINDOW -->
        <div v-if = 'show_main_window_menu & !show_info' class="rate-button">
          <img class="icon rotated" src="@/assets/like.png" alt="dislike" @click="onClickDislikeButton" />
          <span>{{dataDislikes}}</span>
        </div>

        <!-- AGE RESTRICTION IF EXISTS -->
        <a v-if = 'show_age' id="age-restriction">{{age_restriction}} </a>
      </div>



      <!-- Sekcii wsplivaushih okon laikov -->
      <transition name='fade'>
        <div id="like-section" v-if="show_like_section">
          <div class="button" @click="giveLike(1)">
            <img class="" src="@/assets/film.png" />
            <span>Xочу посмотреть в кинотеатре</span>
          </div>
          <div class="button" @click="giveLike(2)">
            <img class="" src="@/assets/computer.png" />
            <span>Xочу посмотреть дома</span>
          </div>
          <div class="button" @click="giveLike(3)">
            <img class="" src="@/assets/like.png" />
            <span>Cмотрел, рекомендую</span>
          </div>
        </div>
      </transition>

      <transition name='fade'>
        <div id="dislike-section" v-if="show_dislike_section">
          <div class="button" @click="giveDislike(4)">
            <img class="" src="@/assets/sad.png" />
            <span>фильм мне неинтересен</span>
          </div>
          <div class="button" @click="giveDislike(5)">
            <img class="rotated" src="@/assets/like.png" />
            <span>смотрел, не рекомендую</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</div>
</template>

<script>
import service from '@/api/base.js'
import AuthWindow from '@/components/AuthWindow'
import FilmInfo from '@/components/FilmInfo'
import SettingsModal from "@/components/SettingsModal"
import ThirdLayer from "@/components/ThirdLayer"
export default {
  // Параметры постера опциональны!!! Можно не передать ни одного в компонент
  props: {
    kid: Number,
    limit: String,
    title: String,
    likes: Number,
    rate: Number,
    description: String,
    comment: String,
    persons: Array,
    budget: String,
    year: Number,
    country: Array,
    votes: Number,
    release: Array,
    genre: Array,
    id: Number,
    dislikes: Number,
  },
  components: {
    FilmInfo,
    SettingsModal,
    AuthWindow,
    ThirdLayer,
  },
  data() {
    return {
      show_like_section: false,
      show_dislike_section: false,
      show_main_window_menu: true,
      show_auth_window: false,
      show_ticket_section: false,
      show_rate_settings: false,
      show_settings_section: false,
      show_third_layer: false,
      like_given: false,
      dataLikes: this.likes,
      dataDislikes: this.dislikes,
      dislike_given: false,
      show_info: false,
      show_age: true,
    }
  },
  methods: {
    onClickLikeButton: function() {
      this.show_like_section = !this.show_like_section
      this.show_dislike_section = false

    },
    onClickDislikeButton: function() {
      this.show_like_section = false
      this.show_dislike_section = !this.show_dislike_section
    },
    onClickInfoButton: function() {
      this.show_info = true
      this.show_like_section = false
      this.show_dislike_section = false
      this.show_auth_window = false
      this.show_age = false
      this.show_main_window_menu = false
      this.show_rate_settings = false
    },
    onClickRateSettingsButton: function() {
      this.show_rate_settings = !this.show_rate_settings
      this.show_like_section = false
      this.show_dislike_section = false
      this.show_main_window_menu = !this.show_main_window_menu
      this.show_age = !this.show_age
    },
    onClickAuthButton: function() {
      this.show_auth_layer = !this.show_auth_layer
    },
    onClickTicketsButton: function() {
      this.show_ticket_section = !this.show_ticket_section
    },
    ////////////
    onClickSettingsButton: function() {

    },
    ///////////
    onClickFourthLayerButton: function() {

    },
    onClickThirdLayerButton: function() {
      this.show_third_layer = true
      this.show_info = false
      this.show_main_window_menu = false
      this.show_auth_window = false
    },
    /* Две функции голоса ниже почти одинаковые, берут целочисленное значение
     и на его основе отправляют нужный запрос по лайку или дизлайку в апи */
    // В будущем переделать на абстракцию!!
    giveLike: function(evaluation) {
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

    // В будущем переделать на абстракцию!!
    giveDislike: function(evaluation) {
      this.show_dislike_section = !this.show_dislike_section
      if (this.dislike_given) {
        console.log("Can't give dislike, you've already voted")
      } else {
      service.post(`films/${this.id}/like/`, {
          evaluation: evaluation,
        })
        .then((response) => {
          if (response.data['liked'] == true) this.dislike_given = true
        })
        .catch((error) => {
          console.log(error)
        })
        this.dataDislikes ++
      console.log("give_dislike")
    }
  }

  },
  computed: {
    imgsrc: function() {
      if (this.kid) {
        let kid = this.kid
        let thousand = Math.trunc(Number(kid) / 1000) + 1 // какая тысяча. используется в URL.
        let url = "http://posters.kinoafisha.ru/" + thousand + "/" + String(kid) + "-001.jpg"
        console.log(url)
        return url
      } else {
        return null
      }
    },
    width: function() {
      return window.innerWidth
    },
    height: function() {
      return window.innerHeight
    },
    full_likes: function() {
      return this.likes
      //todo тысячи записвать как 3100->3.1k
    },
    full_dislikes: function() {
      return this.dislikes
      //todo тысячи записвать как 3100->3.1k
    },
    ratecalced: function() {
      let r = this.rate
      let rc = Math.round(r / 2 + 1)
      if (rc > 5) rc = 5;
      else if (rc == 1) rc = 2;
      if (r == 0) return r;
      else return rc;
    },
    age_restriction: function() {
      let numberPattern = /\d+/g;
      let age = this.limit.match(numberPattern)[0] + '+'
      return age

    }
  }
}
</script>

<style scoped lang='scss'>
@media (orientation: portrait) and (max-width: 600px) {
    .postercontainer {
        max-width: 100vw !important;
        max-height: 100vh !important;
        position: relative !important;
    }
    .poster {
        width: 100% !important;
        height: 100% !important;
        text-align: center !important;
    }
    .poster-image {
        max-width: 100% !important;
        max-height: 100% !important;
    }
    img {
        max-width: 100% !important;
        max-height: 100% !important;
        vertical-align: top !important;
    }
}
@media (orientation: landscape) {
    }


@media (max-height: 470px) {
    #like-section {
        font-size: 0.7em;
        width: 45% !important;
    }
    #dislike-section {
        font-size: 0.7em;
        width: 45% !important;
    }
    .modal-layer {
      font-size: 0.7em !important;
    }
    .settings-button {
      width: 20px !important;
      height: 20px !important;
    }
}
@media (max-height: 800px) {
    .rate {
        font-size: 3em !important;
    }
    #age-restriction {
        font-size: 1.6em !important;
    }
    #dislike-section {
        width: 55% !important;
    }
    #like-section {
        width: 55% !important;
    }
    .button {
        span {
            text-align: start !important;
            font-size: 0.7em !important;
            color: white;
        }
    }
    .modal-layer {
      font-size: 0.81em !important;
    }
    .settings-button {
      width: 30px !important;
      height: 30px !important;

    }
}


@media (max-height: 800px) and (max-width: 300px){
    .rate {
        font-size: 2em !important;
    }
    #age-restriction {
        font-size: 0.6em !important;
    }
    .rate-button {
        font-size: 0.7em;
        span {
          font-size: 1em;
        }
    }
    #bottom-section {
        height: 8% !important;
    }
    .modal-layer {
      font-size: 0.5em !important;
      overflow-y: scroll;
      clear: both !important;
      height: 89.5% !important;
    }
    .settings-button {
      width: 24px !important;
      height: 24px !important;

    }
}

@media (max-height: 400px){
    .rate {
        font-size: 2em !important;
    }
    #age-restriction {
        font-size: 0.6em !important;
    }
    .rate-button {
        font-size: 0.7em;
        span {
          font-size: 1em;
        }
    }
    #bottom-section {
        height: 8% !important;
    }
    .modal-layer {
      font-size: 0.5em !important;
      overflow-y: scroll;
      clear: both !important;
      height: 89.5% !important;
    }
    .settings-button {
      width: 24px !important;
      height: 24px !important;

    }
}


.postercontainer {
    max-width: 25%;
    max-height: 50%;
    margin: 0 auto;
    display: flex;
    align-items: stretch;
    position: relative;
    .poster {
        max-width: 100%;
        max-height: 100%;
        img {
            display: flex;
            flex-direction: column;
        }
    }
}

.star {
    font-size: 0.5em;
}
.icon-img {
    width: 40%;
    margin: 5%;
    cursor: pointer;
}
.icon-img:hover {
    width: 60%;
}
.rotated {
    -webkit-transform: rotate(.5turn);
    transform: rotate(.5turn);
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
}
#like-section {
    position: absolute;
    height: 20%;
    width: 55%;
    top: 69%;
    padding: 1%;
    left: 16%;
    display: block;
    .button {
        cursor: pointer;
        display: flex;
        height: 33%;
        margin-top: 1%;
        img {
            height: 60%;
            margin-right: 3%;
        }
        span {
            display: inline;
            font-size: 1em;
            color: white;
        }
    }
    .button:hover {
        span {
            font-size: 0.77em;
        }
        img {
            height: 65%;
        }
    }
}
#dislike-section {
    position: absolute;
    height: 12%;
    width: 55%;
    top: 77%;
    padding: 1%;
    left: 42%;
    display: block;
    .button {
        cursor: pointer;
        display: flex;
        height: 53%;
        margin-top: 1%;
        img {
            height: 60%;
            margin-right: 3%;
        }
        span {
            display: inline;
            font-size: 0.75em;
            color: white;
        }
    }
    .button:hover {
        span {
            font-size: 0.77em;
        }
        img {
            height: 65%;
        }
    }
}
#settings-section {
    position: absolute;
    height: 6%;
    width: 55%;
    top: 82%;
    padding: 1%;
    left: 67%;
    display: block;
    .button {
        cursor: pointer;
        display: flex;
        height: 100%;
        margin-top: 1%;
        img {
            height: 60%;
            margin-right: 3%;
        }
        span {
            width:50%;
            display: inline;
            font-size: 1em;
            color: white;
        }
    }
  }

.modal-layer {
    clear: both;
    z-index: 2;
    top: 0;
    left: 0;
    height: 91.2%;
    position: absolute;
    background-color: rgba(12, 10, 26, 0.8);
}
.third-layer {
    clear: both;
    z-index: 2;
    top: 0;
    left: 0;
    right:0;
    height: 91.2%;
    position: absolute;
    background-color: rgba(12, 10, 26, 0.8);
}

.modal-rate-settings-layer {
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  height: 91.33%;
  position: absolute;
  background-color: rgba(12, 10, 26, 0.8);
  overflow-y: scroll;
}


.poster {
    position: relative;
    text-align: center;
    flex: 1;
    height: 100%;
    .poster-image {
        height: 100%;
        width: 100%;
        img {
            width: 100%;
            height: 100%;
        }
    }
    #action-elements-layer {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: space-between;
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
                #icon-info {
                    height: 95%;
                    cursor: pointer;
                }
                #icon-info:hover {
                    height: 110%;
                }
            }
            .rate-button {
                padding: 1%;
                display: flex;
                width: 10%;
                margin-left: 3%;
                margin-right: 11%;
                .icon {
                    height: 95%;
                }
                .icon:hover {
                    height: 105%;
                }
                span {
                    font-size: 1.5em;
                    margin-left: 20%;
                }
            }
            .auth-button {
                cursor: pointer;
                display: flex;
                width: 10%;
                margin-left: 10%;
                margin-right: 11%;
                .icon {
                    color: white;
                    height: 100%;
                }
            }
            .tickets-button {
                cursor: pointer;
                padding: 1%;
                display: flex;
                width: 10%;
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
              display: inherit;
              height: 37px;
              width: 37px;
              margin-left: 15%;
              opacity: 0.8;
              img {
                width: 100%;
                height: 100%;
              }
            }
            #dislike {
                img {
                    transform: rotate(0.5turn); // Делаем палец вниз за счет поворота;
                }
            }
            #age-restriction {
                margin-left: 24%;
                text-align: center;
                font-size: 4em;
                background-color: rgba(6, 8, 20, 0.8);
                border-radius: 20%;
            }
        }
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
