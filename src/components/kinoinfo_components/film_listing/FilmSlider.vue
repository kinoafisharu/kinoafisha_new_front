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
              <v-list>
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
              :defaultordering = 'ordering'
              :defaultapiaction = 'defaultapiaction'
              defaultfields = 'id,name,genre,description,votes,kid,country,year,limits,imdb_votes,imdb_rate,persons'>

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
import 'swiper/css/swiper.css'

export default {
  name: 'film-slider',
  title: 'Fraction pagination',
  components: {
    AbsSlider,
    FilmDetail
  },
  mounted() {
    bus.$on('clean', ()=> {
      this.$refs.AbsSlider.update('-imdb_votes', null, {currentPage: 1})
      this.ordering = '-imdb_votes'
      this.datetime = null
    })
  },
  props: {
    defaultapiaction: String,
    showSliderMenu: Boolean,
    defaultordering: String,
  },
  data() {
    return {
      ordering: this.defaultordering,
      showMenu: false,
      datetime: null,
      infoValue: 'Киноафиша',
    }
  },
  methods: {
    onClickToggleSortButton: function(value) {
      if (value == 'New') {this.ordering = '-release__release,year'}
      else if (value == 'Popular') {this.ordering = '-imdb_votes'}
      else if (value == 'ThisWeek') {this.datetime = 'backfromnow,7'}
      else if (value == 'WeekForward') {this.datetime = 'forwardfromnow,7'}
      else if (value == 'ThisMonth') {this.datetime = 'backfromnow,30'}
      else if (value == 'MonthForward') {this.datetime = 'forwardfromnow,30'}
      else if (value == null) {
        this.datetime = null
        this.ordering = '-imdb_votes'
      }
      this.$refs.AbsSlider.update(this.ordering, this.datetime)
    },
  },
  computed: {
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
