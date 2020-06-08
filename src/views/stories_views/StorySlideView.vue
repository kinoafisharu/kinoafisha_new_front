<template>
  <div class='swipercontainer'>
    <div class='toggle-component'>
      <v-col
            cols="12"
            sm="6"
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

              <v-btn value="justify">
                Other
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </div>
  <swiper ref = 'mySwiper' class="swiper" :options="swiperOption" @reachEnd = 'onReachEnd' @reachBeginning = 'onReachBeginning'>
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
      if (this.currentComp == 'Story') {
       await this.$store.dispatch('getStories', {currentPage: this.currentPage})
       let storyobjarr = await this.$store.getters.stories
       this.objarr = storyobjarr
     } else if (this.currentComp == 'FilmDetail') {
       await this.$store.dispatch('getFilms', {currentPage: this.currentPage})
       let filmobjarr = await this.$store.getters.films
       this.objarr = filmobjarr
     }
  },
  data() {
    return {
      toggleData: null,
      currentComp: 'Story',
      currentPage: 1,
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
            1000: {
              slidesPerView: 3,
              spaceBetween: 40
            },
            768: {
              slidesPerView: 2,
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
    onReachEnd: async function() {
        this.currentPage ++
        if (this.currentComp == 'Story') {
          await this.$store.dispatch('getStories', {currentPage: this.currentPage})
          let storyobj = await this.$store.getters.stories
          this.objarr = storyobj
        } else if (this.currentComp == 'FilmDetail') {
          await this.$store.dispatch('getFilms', {currentPage: this.currentPage})
          let filmobj = await this.$store.getters.films
          this.objarr = filmobj
        }
        this.swiper.slideToLoop(0, 20, true);
    },
    onReachBeginning: async function() {
      if (this.currentPage > 1) {
        this.currentPage --
        await this.$store.dispatch('getStories', {currentPage: this.currentPage, page_size: '5'})
        let storyobj = await this.$store.getters.stories
        this.objarr = storyobj
      }
    },
    onClickToggleButton: function() {
      if (this.toggleData == 'Stories') {
        this.currentComp = 'Story'
        this.swiper.update()
      } else if (this.toggleData == 'Films') {
        this.currentComp = 'FilmDetail'
        this.swiper.update()
      }
    },
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
.poster {
  width: 300px;
  height: 400px;
  max-width: 100%;
  max-height: 100%;
}
.poster-block {
  max-width: 100%;
  max-height: 100%;
}
.swiper {
  height: 460px;
}
.toggle-component {
  display: flex;
  justify-content: center;
  left: 0;
}

</style>
