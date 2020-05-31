<template>
<div class='postercontainer'>


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
  <div v-if='show_settings' class = 'modal-settings-layer' @click = 'show_settings_modal'>
      <SettingsModal/>

  </div>
  </transition>



  <div class="poster">

    <!-- Отображение постера елемента если такой есть -->
    <img v-if='imgsrc' class="poster-image" :src="imgsrc">
    <h1 v-else>This element doesn't have an image yet</h1>
    <div id="action-elements-layer">

      <!--Кнопка рейтинга, включает модальное окно с настройками рейтинга-->
      <div class='rate' :class="'rate_color_'+ ratecalced" @click='show_settings_modal' title = 'Show settings'>

        <!-- Отображение рейтинга если такой есть -->
        <div>{{ratecalced}}</div>
      </div>
      <div id="bottom-section">
        <div class="info-place">
          <img id="icon-info" src="@/assets/info.png" alt="info" @click="show_info_modal" />
        </div>
        <div class="rate-button">
          <img class="icon" src="@/assets/like.png" alt="like" @click="mshow_like_section" />
          <span>{{dataLikes}}</span>
        </div>
        <div class="rate-button">
          <img class="icon rotated" src="@/assets/like.png" alt="dislike" @click="mshow_dislike_section" />
          <span>{{dataDislikes}}</span>
        </div>
        <div class ="settings-button">
          <img class ='icon-settigns' src="@/assets/settings.png" alt='settigns'/>
        </div>
        <a id="age-restriction">{{limit}} </a>
      </div>
      <transition name='fade'>
        <div id="like-section" v-if="show_like_section">
          <div class="like-button" @click="give_like(1)">
            <img class="" src="@/assets/film.png" />
            <span>Xочу посмотреть в кинотеатре</span>
          </div>
          <div class="like-button" @click="give_like(2)">
            <img class="" src="@/assets/computer.png" />
            <span>Xочу посмотреть дома</span>
          </div>
          <div class="like-button" @click="give_like(3)">
            <img class="" src="@/assets/like.png" />
            <span>Cмотрел, рекомендую</span>
          </div>
        </div>
      </transition>

      <transition name='fade'>
        <div id="dislike-section" v-if="show_dislike_section">
          <div class="like-button" @click="give_dislike(4)">
            <img class="" src="@/assets/sad.png" />
            <span>фильм мне неинтересен</span>
          </div>
          <div class="like-button" @click="give_dislike(5)">
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
import FilmInfo from '@/components/FilmInfo'
import SettingsModal from "@/components/SettingsModal"
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
    SettingsModal
  },
  data() {
    return {
      show_like_section: false,
      show_dislike_section: false,
      show_settings: false,
      like_given: false,
      dataLikes: this.likes,
      dataDislikes: this.dislikes,
      dislike_given: false,
      show_info: false,
    }
  },
  methods: {
    mshow_like_section: function() {
      this.show_like_section = !this.show_like_section
      this.show_dislike_section = false
    },
    mshow_dislike_section: function() {
      this.show_like_section = false
      this.show_dislike_section = !this.show_dislike_section
    },
    show_info_modal: function() {
      this.show_info = !this.show_info
      this.show_like_section = false
      this.show_dislike_section = false
    },
    show_settings_modal: function() {
      this.show_settings = !this.show_settings
    },
    /* Две функции голоса ниже почти одинаковые, берут целочисленное значение
     и на его основе отправляют нужный запрос по лайку или дизлайку в апи */
    // В будущем переделать на абстракцию!!
    give_like: function(evaluation) {
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
    give_dislike: function(evaluation) {
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

@media (max-height: 600px) {
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
}
@media (max-height: 800px) {
    .rate {
        font-size: 3em !important;
    }
    #age-restriction {
        font-size: 1em !important;
    }
    #dislike-section {
        width: 55% !important;
    }
    #like-section {
        width: 55% !important;
    }
    .like-button {
        span {
            text-align: start !important;
            font-size: 0.7em !important;
            color: white;
        }
    }
    .modal-layer {
      font-size: 0.81em !important;
    }
}
@media (max-height: 300px) {
    .rate {
        font-size: 2em !important;
    }
    #age-restriction {
        font-size: 0.6em !important;
    }
    .rate-button {
        font-size: 0.4em;
    }
    #bottom-section {
        height: 8% !important;
    }
    .modal-layer {
      font-size: 0.5em !important;
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
    .like-button {
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
    .like-button:hover {
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
    .like-button {
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
    .like-button:hover {
        span {
            font-size: 0.77em;
        }
        img {
            height: 65%;
        }
    }
}

.modal-layer {
    z-index: 3;
    top: 0;
    left: 0;
    height: 92.2%;
    position: absolute;
    background-color: rgba(12, 10, 26, 0.8);
    overflow-y: scroll;
}

.modal-settings-layer {
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
            border-top-right-radius: 35%;
            border-bottom-right-radius: 35%;
            padding-left: 4%;
            padding-right: 2%;
            color: black;
            align-self: flex-start;
            margin-top: 14%;
            font-size: 3.0em;
            padding-bottom: 1%;
            padding-top: 1%;
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
            .settings-button {
              display: flex;
              width: 12%;
              margin-left: 5%;
              padding: 1%;

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
                margin-left: 6%;
                font-size: 4em;
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
