<template>
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
  <AbsSlider  ref = 'AbsSlider'
              component = 'FilmDetail'
              defaultdispatcher = 'getFilms'
              :defaultordering = 'ordering'
              :defaultapiaction = 'defaultapiaction'
              defaultfields = 'id,name,genre,description,votes,kid,country,year,limits,imdb_votes,imdb_rate,persons'/>
</div>
</template>


<script>
import AbsSlider from "@/components/global/sliders/AbsSlider"
import 'swiper/css/swiper.css'

export default {
  name: 'film-slider',
  title: 'Fraction pagination',
  components: {
    AbsSlider,
  },
  props: {
    defaultapiaction: String
  },
  data() {
    return {
      ordering: 'id',
      showMenu: false,
      items: [
        { title: 'На этой неделе в кинотеатрах' },
        { title: 'На этой неделе онлайн' },
        { title: 'Лучшее в кинотеатрах' },
        { title: 'Лучшее онлайн' },
        { title: 'Бокс-офис уикенда'},
        { title: 'Топ 250'},
      ],
    }
  },
  methods: {
    onClickToggleSortButton: function(value) {
      this.currentPage = 1
      if (value == 'New') {this.ordering = '-year'}
      else if (value == 'Popular') {this.ordering = '-imdb_votes'}
      this.$refs.AbsSlider.update(this.ordering)
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
