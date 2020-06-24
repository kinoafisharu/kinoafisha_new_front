<template>
<!-- Слайдер фильмов, рендерит AbsSlider c компонентами Фильма -->
<div class = 'film-slider-container'>
  <div v-if = 'showSliderMenu' class='toggle-sort-component'>
        <div class="text-center">
            <v-menu offset-y
                    v-model = 'showMenu'>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Фильтр
                </v-btn>
              </template>
              <v-list nav>
                <v-list-item  @click.native = "onClickToggleSortButton('New')">
                  <v-list-item-title>Новые</v-list-item-title>
                </v-list-item>
                <v-list-item  @click.native = "onClickToggleSortButton('Popular')">
                  <v-list-item-title>Популярные</v-list-item-title>
                </v-list-item>
                <v-list-item  @click.native = 'onClickToggleSortButton'>
                  <v-list-item-title>Личности</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <template>
    <div  class="text-center">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Параметры
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="dwd"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </template>
    </div>
  <AbsSlider  @zoom = 'onClickZoomButton'
              ref = 'AbsSlider'
              defaultdispatcher = 'getFilms'
              :objs = 'objs'
              :defaultordering = 'ordering'
              :defaultapiaction = 'defaultapiaction'
              defaultfields = 'id,name,genre,description,votes,kid,country,year,limits,imdb_votes,imdb_rate,persons'
              :defaultdatetime = 'datetime'>
    <template v-slot:default="slotProps">
        <FilmDetail :obj = 'slotProps.obj'/>
    </template>
  </AbsSlider>
</div>
</template>


<script>
import AbsSlider from "@/components/global/sliders/AbsSlider"
import FilmDetail from "@/components/kinoinfo_components/film_detail/FilmDetail"
import { bus } from '@/bus/bus.js'
import utils from "@/utils/utils.js"
import 'swiper/css/swiper.css'

export default {
  name: 'film-slider',
  title: 'Fraction pagination',
  components: {
    AbsSlider,
    FilmDetail
  },
  async mounted() {
    // Метод вызывается каждый раз когда происходит событие clean
    // clean - переход на начальную точку, очистка всех фильтров
    bus.$on('clean', ()=> {
      this.$refs.AbsSlider.update('-imdb_votes', null)
      this.ordering = '-imdb_votes'
      this.datetime = null
    })
    this.ordering = this.sort_and_date.split('?')[0]
    this.datetime = this.sort_and_date.split('?')[1]
    console.log(this.sort_and_date.split('?')[1]);
  },
  props: {
    defaultapiaction: String, //метод в апи
    showSliderMenu: Boolean, //Включить Отключить встроенное меню слайдер
    sort_and_date: String, //  Сортировка по умолчанию
  },
  data() {
    return {
      ordering: this.sort_and_date.split('?')[0],
      showMenu: false,
      datetime: this.sort_and_date.split('?')[1],
      infoValue: 'Киноафиша',
    }
  },
  methods: {
    //  Обновляет слайдер с новыми праметрами сортировки
    updateOrderingAndFilters: function(value) {
      let items = utils.getOrderingAndDatetime(value)
      this.ordering = items[0]
      this.datetime = items[1]
      this.$refs.AbsSlider.update(this.ordering, this.datetime)
    },
  },
  computed: {
    objs: function() {
      return this.$store.getters.films
    },
  }
}
</script>

<style scoped lang ='scss'>
::v-deep #bottom-section {
  height: 6.5%;
}
.toggle-sort-component {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  width: 7.5%;
  margin: 0 auto;
  margin-bottom: 1%;
}
.text-center {
  margin-left: 20%;
}


</style>
