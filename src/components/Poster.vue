<template>
  <div class="poster">
    <img class="poster-image" :src="src" :style="{ width: height*0.7 + 'px', height: height + 'px'}" >
    <div id="action-elements-layer">
        <div class="rate" :class="'rate_color_'+this.rate" :title="rate_title">
          <a>{{Math.round(rate)}}</a>
          <a class="star">★</a>
        </div>
        <div id="bottom-section">
            <div v-if="show_info" class="info-place">
              <img id="icon-info" src="../assets/info.png" alt="info"  @click="show_info_modal"/>
            </div>
            <div class="rate-button">
              <img class="icon" src="../assets/like.png" alt="like" @click="mshow_like_section"/>
              <span>{{full_likes}}</span>
            </div>
            <div class="rate-button">
              <img class="icon rotated" src="../assets/like.png" alt="dislike" @click="mshow_dislike_section"/>
              <span>{{full_dislikes}}</span>
            </div>
            <a id="age-restriction">{{limits}} </a>
        </div>
        <div id="like-section" v-if="show_like_section" :style="{background: bottom_section_bg }">            
          <div class="like-button" @click="give_like('cinema')">
            <img class="" src="../assets/film.png" />
            <span>хочу посмотреть в кинотеатре</span>
          </div>
          <div class="like-button" @click="give_like('home')">
            <img class="" src="../assets/computer.png" />
            <span>хочу посмотреть дома</span>
          </div>
          <div class="like-button" @click="give_like('saw')">
            <img class="" src="../assets/like.png" />
            <span>смотрел, рекомендую</span>
          </div>
        </div>

        <div id="dislike-section" v-if="show_dislike_section" :style="{background: bottom_section_bg }">            
          <div class="like-button" @click="give_dislike('uninteresting')">
            <img class="" src="../assets/sad.png" />
            <span>фильм мне неинтересен</span>
          </div>
          <div class="like-button" @click="give_dislike('saw')">
            <img class="rotated" src="../assets/like.png" />
            <span>смотрел, не рекомендую</span>
          </div>
        </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Poster',
  props: {
    src: String,
    id: Number,
    show_info : Boolean,
    modal_html : String,
    onPosterClick : Function,
    limits : String,
    ratings : Array
  },
  data() {
    return {
      show_like_section : false,
      show_dislike_section : false,
      likes : 3,
      like_gived : false,
      dislikes : 4,
      dislike_gived : false
    }
  },
  methods: {
    mshow_like_section: function () {
      this.show_like_section = !this.show_like_section
      this.show_dislike_section = false
    },
    mshow_dislike_section: function () {
      this.show_like_section = false
      this.show_dislike_section = !this.show_dislike_section
    },
    show_info_modal: function () {
      this.onPosterClick(this.id)
    },
    give_like : function (reason) {
      this.show_like_section = !this.show_like_section
      if(this.like_gived) return //нельзя дать много лайков одному фильму
      console.log("give_like", reason)
      this.like_gived = true
      //todo Like2Server
    },
    give_dislike : function (reason) {
      this.show_dislike_section = !this.show_dislike_section
      if(this.dislike_gived) return //нельзя дать много дизлайков одному фильму
      console.log("give_dislike", reason)
      this.dislike_gived = true
      //todo dislike2Server
    }
  },
  computed: {
    width : function(){
      return window.innerWidth
    },
    height : function(){
      return window.innerHeight
    },
    full_likes : function(){
      if(this.like_gived) return this.likes+1
      return this.likes
      //todo тысячи записвать как 3100->3.1k
    },
    full_dislikes : function(){
      if(this.dislike_gived) return this.dislikes+1
      return this.dislikes
      //todo тысячи записвать как 3100->3.1k
    },
    rate:  function () {
      let rates = this.ratings.filter(r=>parseFloat(r.rate)) //0 rate - empty rate
      let rate = 0
      rates.forEach(r => { 
        rate+=parseFloat(r.rate)
      })
      rate = Math.round(rate/rates.length)
      if (rate >= 7) rate = 5
        else if (rate == 6) rate = 4
        else if (rate == 5) rate = 3
        else if (rate == 0) rate = 0
        else rate = 2

      return rate
    },
    rate_title:  function () {
      return this.ratings
        .filter(r=>parseFloat(r.rate))
        .map(r => {return `${r.source} ${r.rate}`}).join(', ')
    }
  }
}
</script>


<style scoped lang="scss">
@import "Poster";
</style>