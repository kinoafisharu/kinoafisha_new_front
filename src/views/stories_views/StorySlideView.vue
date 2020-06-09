<template>
  <div class='swipercontainer'>
    <div class='toggle-component'>
      <v-col
            cols="12"
            sm="3"
            class="py-2"
          >

            <v-btn-toggle
              v-model="toggleData"
              tile
              color="deep-purple accent-3"
              group
            >
              <v-btn value="Stories" @click.native = 'onClickToggleButton'>
                Stories
              </v-btn>

              <v-btn value="Films" @click.native = 'onClickToggleButton'>
                Films
              </v-btn>

              <v-btn value="Other">
                Other
              </v-btn>
            </v-btn-toggle>
          </v-col>
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
        </div>
  <swiper ref = 'mySwiper' class="swiper" :options="swiperOption" @reachEnd = 'onReachEnd'>
      <swiper-slide v-for = 'obj in objarr' :key = 'obj.id'>
        <component :obj = 'obj' :is = 'currentComp'>
        </component>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</div>
</template>


<script>
import Story from "@/components/stories_components/Story"
import FilmDetail from "@/components/kinoinfo_components/film_detail/FilmDetail"
import 'swiper/css/swiper.css'

export default {
  name: 'swiper-pag',
  title: 'Fraction pagination',
  components: {
    Story,
    FilmDetail
  },
  async created() {
    this.makeRequest('id,text,title,dtime', 'getval', this.currentStoryOrdering)
  },
  data() {
    return {
      showMenu: false,
      toggleData: null,
      currentComp: 'Story',
      currentPage: 1,
      currentFilmOrdering: 'id',
      currentStoryOrdering: 'id',
      currentDispatcher: 'getStories',
      objarr: null,
      swiperOption: {
        loop: true,
        loopAdittionalSlides: -1,
        loopPerSlides: 0,
        slidesPerView: 1,
        mousewheel: true,
        keyboard: {
             enabled: true,
           },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        computed: {
          swiper() {
            return this.$refs.mySwiper.$swiper
          }
        },
        breakpoints: {
            1100: {
              slidesPerView: 3,
              spaceBetween: 40
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            }
          },
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  methods: {
    makeRequest: async function(fieldvalues, apiaction, itemordering) {
       await this.$store.dispatch(this.currentDispatcher, {currentPage: this.currentPage,
                                                             values: fieldvalues,
                                                             action: apiaction,
                                                             ordering: itemordering})
      let objarr = null
      if (this.currentDispatcher == 'getFilms') { objarr = await this.$store.getters.films}
      else if (this.currentDispatcher == 'getStories') { objarr = await this.$store.getters.stories }
      this.objarr = objarr
    },
    onReachEnd: async function() {
        this.currentPage ++
        if (this.currentComp == 'Story') {
            await this.makeRequest('id,text,title,dtime', 'getval', this.currentStoryOrdering)
        } else if (this.currentComp == 'FilmDetail') {
            await this.makeRequest('id,name,genre,description,votes,kid,country,year,limits,imdb_votes,imdb_rate,persons', 'getval', this.currentFilmOrdering)
        }
        this.swiper.slideToLoop(0, 0, true);
    },
    onClickToggleButton:  async function() {
      if (this.toggleData == 'Stories') {
        this.currentPage = 1
        this.currentDispatcher = 'getStories'
        this.currentComp = 'Story'
      await this.makeRequest('id,text,title,dtime', 'getval', this.currentStoryOrdering)
      } else if (this.toggleData == 'Films') {
        this.currentPage = 1
        this.currentDispatcher = 'getFilms'
        this.currentComp = 'FilmDetail'
        await this.makeRequest('id,name,genre,description,votes,kid,country,year,limits,imdb_votes,imdb_rate,persons', 'getval', this.currentFilmOrdering)
      }
    },
    onClickToggleSortButton: async function(value) {
      if (this.currentComp == 'FilmDetail') {
        if (value == 'New') {
          this.currentFilmOrdering = '-year'
        } else if (value == 'Popular') {
          this.currentFilmOrdering = '-imdb_votes'
        }
        await this.makeRequest('id,name,genre,description,votes,kid,country,year,limits,imdb_votes,imdb_rate,persons', 'getval', this.currentFilmOrdering)
      } else if (this.currentComp == 'Story') {
          if (value == 'New') {
            this.currentStoryOrdering = '-dtime'
          } else if (value == 'Popular') {
            this.currentStoryOrdering = 'id'
          }
            this.makeRequest('id,text,title,dtime', 'getval', this.currentStoryOrdering)
      }
      console.log(this.currentFilmOrdering);
      console.log(this.currentStoryOrdering);
    }
  },
}

</script>

<style lang ='scss'>
.postercontainer {
  width: 300px;
  height: 400px;
  max-width: 100%;
  max-height: 100%;
}

.swiper {
  height: 460px;
}
.toggle-component {
  display: flex;
  flex-direction: row;
  justify-content: center;
  left: 0;
}
#bottom-section {
  height: 6.5%;
}
.text-center {
  margin-top: 1.65%;
}


</style>
