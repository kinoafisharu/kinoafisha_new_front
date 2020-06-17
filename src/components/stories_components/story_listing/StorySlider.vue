<template>
<!-- Слайдер историй, рендерит в себе компонент абстрактного слайдера с постерами историй -->
<div class = 'story-slider-wrapper'>
  <div class='toggle-sort-component'>
        <div v-if = 'showSliderMenu' class="text-center">
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
  <AbsSlider  ref = 'AbsSlider'
              defaultdispatcher = 'getStories'
              :defaultordering = 'computeordering'
              :defaultapiaction = 'defaultapiaction'
              defaultfields = 'id,text,title,dtime'>

    <template v-slot:default="slotProps">
      <Story :obj = 'slotProps.obj'/>
    </template>
  </AbsSlider>
</div>
</template>


<script>
import AbsSlider from "@/components/global/sliders/AbsSlider"
import Story from "@/components/stories_components/Story"
import 'swiper/css/swiper.css'

export default {
  name: 'story-slider',
  title: 'Fraction pagination',
  components: {
    AbsSlider,
    Story
  },
  props: {
    defaultapiaction: String,
    defaultordering: String,
    showSliderMenu: Boolean,
  },
  data() {
    return {
      showMenu: false,
      ordering: 'id',
    }
  },
  mounted() {
    console.log(this.defaultordering);
  },
  methods: {
    onClickToggleSortButton: function(value) {
      this.currentPage = 1
      if (value == 'New') {this.ordering = 'dtime'}
      else if (value == 'Popular') {this.ordering = 'id'}
      this.$refs.AbsSlider.update(this.ordering)
      console.log(this.ordering);
    },
  },
  computed: {
    computeordering: function() {
      if (this.defaultordering) {return this.defaultordering}
      else {return this.ordering}
    }
  }
}
</script>

<style scoped lang ='scss'>

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
.toggle-sort-component {
  position: relative;
  width: 7.5%;
  margin: 0 auto;
  margin-bottom: 1%;
}



</style>
