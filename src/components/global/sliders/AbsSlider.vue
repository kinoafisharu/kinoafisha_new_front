<template>
  <div v-if = '!loading' class='swipercontainer'>
  <swiper ref = 'mySwiper' class="swiper" :options="swiperOption" @reachEnd = 'onReachEnd'>
      <swiper-slide v-for = 'obj in objarr' :key = 'obj.id'>
        <slot v-bind:obj = 'obj'></slot>
      </swiper-slide>
      <swiper-slide>
        <div class = 'absslider-loading-slide'>
          <v-progress-circular
            :size="150"
            :width="14"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>

      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</div>
</template>


<script>
import RequestMixin from "@/mixins/RequestMixin"
import 'swiper/css/swiper.css'

export default {
  name: 'abstract-slider',
  mixins: [RequestMixin,],
  components: {
  },
  async created() {
    await this.makeRequest(this.dispatcher, this.currentPage, this.fields, this.apiaction, this.ordering)
    this.loading = false
    console.log('req done')
  },
  props: {
    defaultdispatcher: String,
    defaultfields: String,
    defaultapiaction: String,
    defaultordering: String,
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
      datetime: 'all',
      objarr: null,
      swiperOption: {
        slidesPerView: 1,
        mousewheel: true,
        keyboard: {
             enabled: true,
           },
        pagination: {

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
            900: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            800: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
              navigation: {

              }
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
        await this.makeRequest(this.dispatcher, this.currentPage, this.fields, this.apiaction, this.ordering, this.datetime)
        this.swiper.slideTo(0, 0, false);
    },
    update: async function(ordering, datetime) {
      this.currentPage = 1
      this.datetime = datetime
      this.ordering = ordering
      await this.makeRequest(this.dispatcher, this.currentPage, this.fields, this.apiaction, this.ordering, this.datetime)
    }
  },
}

</script>

<style scoped lang ='scss'>
@media (max-width: 20%) {

}

::v-deep .postercontainer {
  width: 363px;
  height: 520px;
  max-width: 100% !important;
}


.absslider-loading-slide {
  margin: 0 auto;
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
