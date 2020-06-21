<template>
<!-- Абстрактная модель слайдера
несет в себе логику слайдера и основные методы
оборачивает компонент, который необходимо отобразить в слайдах -->
  <div class='swipercontainer'>
  <transition name = 'fade'>
  <!-- Сам слайдер, прогружается только тогда, когда получен массив обьектов
      Получает массив с обьектами продуктов, отображает их в виде слайдера
      Принцип работы - Data Iterator с динамическими запросами к API -->
  <swiper v-if = '!loading' ref = 'mySwiper' class="swiper" :options="swiperOption" @reachEnd = 'onReachEnd'>
      <swiper-slide v-for = 'obj in objs' :key = 'obj.id'>
        <slot v-bind:obj = 'obj'></slot>
      </swiper-slide>
      <!-- Слайд для зарузки в конце массива -->
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
  </transition>
    <!-- Скелет слайдера при загрузке - Под Доделку!! WARNING-->
    <div v-if = 'loading'>
      <v-row>
          <v-col
            cols="12"
            md="5"
            sm='10'
          >
        <v-skeleton-loader
          height="200"
          type="card"
        >
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </div>
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
  },
  props: {
    defaultdispatcher: String,
    defaultdatetime: String,
    defaultfields: String,
    defaultapiaction: String,
    defaultordering: String,
    objs: Array,
  },
  data() {
    return {
      objarr: this.objs,
      loading: true,
      toggleData: null,
      apiaction: this.defaultapiaction,
      fields: this.defaultfields,
      ordering: this.defaultordering,
      pagesize: 25,
      dispatcher: this.defaultdispatcher,
      datetime: this.defaultdatetime,
      swiperOption: {
        slidesPerView: 1,
        mousewheel: true,
        allowSlidePrev: true,
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
    // Динамически обновляет информацию об обьекте для запроса
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
    // Событие - слайдер достиг конца, прогружается новый список обьектов
    // Список прогружен - слайд к началу списка
    onReachEnd: async function() {
        this.currentPage ++
        await this.makeRequest(this.dispatcher, this.requestObject)
        this.swiper.slideTo(0, 0, false);
    },
    // Метод принудительного обновления, принимает в качестве аргументов
    // Тип сортировки, выборку по времени и обьект с параметрами
    // Обновляет слайдер с новыми параметрами
    update: async function(ordering, datetime) {
      this.currentPage = 1
      this.datetime = datetime
      this.ordering = ordering
      await this.makeRequest(this.dispatcher, this.requestObject)
      this.swiper.slideTo(0, 0, false);
    },
  },

}
</script>

<style scoped lang ='scss'>

@media (orientation: portrait) and (max-width: 396px) {
  ::v-deep .postercontainer {
    width: 340px !important;
    max-width: 100% !important;
    height: 495px !important;
  }
}

@media (orientation: portrait) and (max-width: 323px) {
  ::v-deep .postercontainer {
    width: 333px !important;
    max-width: 100% !important;
    height: 415px !important;
  }
}

::v-deep .postercontainer {
  width: 378px;
  height: 533px;
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 2s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
