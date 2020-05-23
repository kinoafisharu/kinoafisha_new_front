
<template>
<div class = 'postercontainer'>
<div class="poster">

  <!-- POSTER IMAGE -->
  <img class="poster-image" :src="imgsrc" :style="{ width: height*0.7 + 'px', height: height + 'px'}">
  
  <!-- BLOCK OF ACTION ELEMENTS (HEIGHT AND WIDTH IS EQUAL TO POSTER) -->
  <div id="action-elements-layer">
    <div class = 'rate' :class="'rate_color_'+1">
      <a>{{Math.round(ratecalced)}}</a>
      <a class="star">★</a>
    </div>
    
    <!-- BOTTOM OF ACTION LAYER -->
    <div id="bottom-section">
      <div v-if="show_info" class="info-place">
        <img id="icon-info" src="@/assets/info.png" alt="info" @click="show_info_modal" />
      </div>
      <div class="rate-button">
        <img class="icon" src="@/assets/like.png" alt="like" @click="mshow_like_section" />
        <span>{{full_likes}}</span>
      </div>
      <div class="rate-button">
        <img class="icon rotated" src="@/assets/like.png" alt="dislike" @click="mshow_dislike_section" />
        <span>{{full_dislikes}}</span>
      </div>
      <a id="age-restriction">{{agelimits}} </a>
    </div>
    
    <!-- LIKE SECTION (SHOWN WHEN LIKE BUTTON CLICKED) -->
    <div id="like-section" v-if="show_like_section" :style="{background: bottom_section_bg }">
      <div class="like-button" @click="give_like('cinema')">
        <img class="" src="@/assets/film.png" />
        <span>хочу посмотреть в кинотеатре</span>
      </div>
      <div class="like-button" @click="give_like('home')">
        <img class="" src="@/assets/computer.png" />
        <span>хочу посмотреть дома</span>
      </div>
      <div class="like-button" @click="give_like('saw')">
        <img class="" src="@/assets/like.png" />
        <span>смотрел, рекомендую</span>
      </div>
    </div>
    
    <!-- DISLIKE SECTION (SAME AS LIKE) -->
    <div id="dislike-section" v-if="show_dislike_section" :style="{background: bottom_section_bg }">
      <div class="like-button" @click="give_dislike('uninteresting')">
        <img class="" src="@/assets/sad.png" />
        <span>фильм мне неинтересен</span>
      </div>
      <div class="like-button" @click="give_dislike('saw')">
        <img class="rotated" src="@/assets/like.png" />
        <span>смотрел, не рекомендую</span>
      </div>
    </div>

  </div>
</div>
</div>
</template>

<script>
export default {
  props: {
    kid: String,
    show_info: Boolean,
    modal_html: String,
    onPosterClick: Function,
    agelimits: String,
    rate: Number,
  },
  data() {
    return {
      show_like_section: false,
      show_dislike_section: false,
      likes: 3,
      like_given: false,
      dislikes: 4,
      dislike_given: false
    }
  },
  methods: {
    // SHOW LIKE SECTION
    mshow_like_section: function() {
      this.show_like_section = !this.show_like_section
      this.show_dislike_section = false
    },
    // SHOW DISLIKE SECTION, CLOSE LIKE SECTION
    mshow_dislike_section: function() {
      this.show_like_section = false
      this.show_dislike_section = !this.show_dislike_section
    },
    // MODAL INFO SHOW
    show_info_modal: function() {
      this.onPosterClick(this.id)
    },
    
    give_like: function(reason) {
      this.show_like_section = !this.show_like_section
      if (this.like_given) return //нельзя дать много лайков одному фильму
      console.log("give_like", reason)
      this.like_given = true
      //todo Like2Server
    },
    
    give_dislike: function(reason) {
      this.show_dislike_section = !this.show_dislike_section
      if (this.dislike_given) return //нельзя дать много дизлайков одному фильму
      console.log("give_dislike", reason)
      this.dislike_given = true
      //todo dislike2Server
    }
  },
  computed: {
    imgsrc: function() {
      if (this.kid) {
        let kid = this.kid
        let thousand = Math.trunc(Number(kid) / 1000) + 1 // какая тысяча. используется в URL.
        let url = "http://posters.kinoafisha.ru/" + thousand + "/" + kid + "-001.jpg"
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
      if (this.like_gived) return this.likes + 1
      return this.likes
      //todo тысячи записвать как 3100->3.1k
    },
    full_dislikes: function() {
      if (this.dislike_gived) return this.dislikes + 1
      return this.dislikes
      //todo тысячи записвать как 3100->3.1k
    },
    ratecalced: function() {
      return this.rate
    },
  }
}
</script>

<style scoped lang='scss'>
// usually for mobile
@media (orientation: portrait) {

    .poster {
        width: inherit;
    }

    .poster-image {
        width: inherit;
        flex: 1;
    }
    img {
      max-width: 100%;
      max-height: 100%;
      vertical-align: top;
    }
}

// desktop is always landscape
@media (orientation: landscape) {
    .poster {
        height: inherit;
        width: inherit;
        display: flex;
    }

    .poster-image {
        height: auto;
        flex: 2;
    img {
      max-width: 100%;
      max-height: 100%;
      vertical-align: top;
    }
    }
}

@media (max-height: 600px) {
    #like-section {
        font-size: 0.7em;
    }
    #dislike-section {
        font-size: 0.7em;
    }
}

@media (max-height: 500px) {
    .rate {
        font-size: 3em !important;
    }
    #age-restriction {
        font-size: 1.6em !important;
    }
    #dislike-section {
        width: 7% !important;
    }
    #like-section {
        width: 7% !important;
    }
    .like-button {
        span {
            display: none;
        }
    }
}
@media (max-height: 250px) {
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
    background: rgba(238, 130, 238, 0.8) !important;
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
    width: 35%;
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

#dislike-section {
    position: absolute;
    height: 12%;
    width: 35%;
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

.postercontainer {
    width: inherit;
    height: inherit;
    display: flex;
    position: relative;
    margin: 0 auto;
}

.poster {
    position: relative;
    text-align: center;
    flex: 1;
    .poster-image {
        z-index: 1;
        max-height: 100%;
        max-width: 100%;
    }

    #action-elements-layer {
        position: absolute;
        z-index: 2;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: space-between;

        .rate {
            display: flex;
            border-top-right-radius: 35%;
            border-bottom-right-radius: 35%;
            padding-left: 4%;
            padding-right: 2%;
            color: black;
            align-self: flex-start;
            margin-top: 14%;
            font-size: 4.0em;
            padding-bottom: 1%;
            padding-top: 1%;
            color: white;
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

            #dislike {
                img {
                    transform: rotate(0.5turn); // Делаем палец вниз за счет поворота.
                }
            }

            #age-restriction {
                margin-left: 20%;
                font-size: 2em;
            }
        }
    }
}
</style>
