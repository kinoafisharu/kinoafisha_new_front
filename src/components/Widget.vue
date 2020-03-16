<template>
  <div :style="{ width: height*0.7 + 'px', height: height + 'px'}" >
    <Modal v-if="showModal || poster_right" @close="showModal = false" 
      :width="modal_width" :height="height" :margin_left="modal_container_ml"
      :show_close_btn="!poster_right">
      <div slot="body" class="descriptions">
        <p class="film_name"><b>{{name}}</b></p>
        <p class="film_origin_name">{{original}}</p>
        <p class="pd"><a class="first"><b>Год выпуска : </b></a><a class="second"> {{year}}</a></p>
        <p class="pd"><a class="first"><b>Жанр :        </b></a><a class="second"> {{genres}}</a></p>
        <p class="pd"><a class="first"><b>Актеры :      </b></a><a class="second">{{persons}}</a></p>
        <p class=""><a><b>Описание :</b></a></p>
        <p class=""><a>{{description}}</a></p>
      </div>
    </Modal>
    <swiper :options="swiperOption"
      @init="init_swiper"
      @slideChange="slideChange">
      <!-- slides -->
      <swiper-slide 
      v-for="film in films"
      :key="film.id">    
        <Poster :src="film.poster" :id="film.id" 
          :onPosterClick='onPosterClick'
          :limits="film.limits"
          :width="width" :height="height"
          :show_info="!poster_right"
          :ratings="film.ratings"/>
      </swiper-slide>

      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Poster from './Poster.vue'
import Modal from './Modal.vue'

export default {
  name: 'Widget',
  components: {
    Poster, swiper, swiperSlide, Modal
  },
  props: {
    films: Object
  },
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      showModal : false,
      name : "",
      year : "",
      original : "",
      description : "",
      genres : "",
      persons : "",
      was_updated : false
    }
  },
  methods :{
    onPosterClick (id) {
      this.showModal = true
      let film = this.films.filter(film=>film.id==id)[0]
      setDescriptionFilm(film, this)
    },
    slideChange(){
      let mySwiper = document.querySelector('.swiper-container').swiper
      let film = this.films[mySwiper.activeIndex]
      setDescriptionFilm(film, this)
    },
    init_swiper(){
      console.log("inited_swiper")
      let film = this.films[0]
      setDescriptionFilm(film, this)
    }
  },
  computed: {
    width : function(){
      return window.innerWidth
    },
    height : function(){
      return window.innerHeight
    },
    poster_right : function(){
      if(window.innerWidth >= window.innerHeight*0.7*2) return true
      return false
    },
    modal_width : function(){
      if(window.innerWidth >= window.innerHeight*0.7*2) return window.innerHeight*0.7
      return window.innerHeight*0.7
    },
    modal_container_ml : function(){
      if(window.innerWidth >= window.innerHeight*0.7*2) return window.innerHeight*0.7
      return 0
    },
  },
  updated: function () {
    if(this.was_updated) return
    this.was_updated = true
    let film = this.films[0]
    setDescriptionFilm(film, this)
  }
}

function setDescriptionFilm(film, it){
  it.name = film.name
  it.year = film.year
  it.original = film.original
  it.description = film.description
  it.genres = film.genres.map((el)=>{return el.name}).join(', ')
  it.persons = film.persons.map((el)=>{return el.name}).join(', ')
}

</script>

<style scoped lang="scss">
body{
  overflow: hidden;
  font-family: Helvetica, Arial, sans-serif;
}
.swiper-container{
  height: 100%;
}
.dark{
  background-color: #414141;
  color: white;
}
.star{
  width: 12px;
}
.votes{
  position: relative;
  width: 14px;
  top: 2px;
}

p{
  margin : 0px;
  margin-left : 15px;
}

.pd{
  margin-block-start: 4%;
  margin-block-end: 2%;
  display: flex;
  .first {
    width: 35%;
  }
  .second {
    width: 70%;
  }
}
.descriptions{
  color: #d4d4d4;
}
.film_name{
  color: white;
  margin-top:10px;
  font-size: 1.5em;
}
.film_origin_name{
  margin-top:5px;
  margin-bottom:25px;
  font-size: 1.2em;
}

.swiper-button-disabled {
  opacity: 0 !important;
}
.swiper-button-prev{
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23fff'%2F%3E%3C%2Fsvg%3E");
  opacity: 0.5;
}
.swiper-button-next{
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23fff'%2F%3E%3C%2Fsvg%3E");
  opacity: 0.5;
}

</style>