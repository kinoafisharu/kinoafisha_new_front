<template>
  <div v-if = '!loading' class='swipercontainer'>
  <swiper ref = 'mySwiper' class="swiper" :options="swiperOption" @reachEnd = 'onReachEnd'>
      <swiper-slide v-for = 'obj in objarr' :key = 'obj.id'>
        <FilmDetail v-if = "currentComp == 'FilmDetail'" :obj = 'obj'/>
        <Story v-if = "currentComp == 'Story'" :obj = 'obj'/>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</div>
</template>


<script>
import RequestMixin from "@/mixins/RequestMixin"
import FilmDetail from "@/components/kinoinfo_components/film_detail/FilmDetail"
import Story from "@/components/stories_components/Story"
import 'swiper/css/swiper.css'

export default {
  name: 'abstract-slider',
  mixins: [RequestMixin,],
  components: {
    FilmDetail,
    Story,
  },
  async created() {
    await this.makeRequest(this.dispatcher, this.currentPage, this.fields, this.apiaction, this.ordering)
    this.loading = false
    console.log('req done')
  },
  props: {
    defaultdispatcher: String,
    defaultordering: String,
    defaultfields: String,
    defaultapiaction: String,
    component: String,
  },
  data() {
    return {
      loading: true,
      toggleData: null,
      currentComp: this.component,
      apiaction: this.defaultapiaction,
      fields: this.defaultfields,
      ordering: this.defaultordering,
      dispatcher: this.defaultdispatcher,
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
    onReachEnd: async function() {
        this.currentPage ++
        await this.makeRequest(this.dispatcher, this.currentPage, this.fields, this.apiaction, this.ordering)
        this.swiper.slideToLoop(0, 0, false);
    },
    update: async function(ordering) {
      this.ordering = ordering
      await this.makeRequest(this.dispatcher, this.currentPage, this.fields, this.apiaction, ordering)
    }
  },
}

</script>

<style scoped lang ='scss'>
::v-deep .postercontainer {
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
::v-deep #bottom-section {
  height: 6.5%;
}
.text-center {
  margin-top: 1.24%;
  margin-left: 1%;
}


</style>
