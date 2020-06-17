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
    await this.makeRequest(this.dispatcher, this.requestObject)
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
      apiaction: this.defaultapiaction,
      fields: this.defaultfields,
      ordering: this.defaultordering,
      pagesize: null,
      dispatcher: this.defaultdispatcher,
      datetime: 'all',
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
              spaceBetween: 10,
            },
            800: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
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
    },
    requestObject:function() {
      let obj = {
          currentPage: this.currentPage,
          values: this.fields,
          action: this.apiaction,
          ordering: this.ordering,
          datetime: this.datetime,
          page_size: this.pagesize,
      }
      return this.lodash.omitBy(obj, this.lodash.isNil)
    }
  },
  methods: {
    onReachEnd: async function() {
        this.currentPage ++
        await this.makeRequest(this.dispatcher, this.requestObject)
        this.swiper.slideTo(0, 0, false);
    },
    update: async function(ordering, datetime, pagesize) {
      this.currentPage = 1
      this.datetime = datetime
      this.ordering = ordering
      this.pagesize = pagesize
      await this.makeRequest(this.dispatcher, this.requestObject)
    },
  },
}
</script>

<style scoped lang ='scss'>
@media (orientation: portrait) {
  ::v-deep .postercontainer {
    width: 338px !important;
    max-width: 100% !important;
    height: 495px !important;
  }
}

::v-deep .postercontainer {
  width: 380px;
  height: 550px;
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
