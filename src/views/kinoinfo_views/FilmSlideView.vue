<template>
  <MainLayout :title = 'currentTitle'>
    <template v-slot:overlay>
      <InfoOverlay  v-if = 'currentObj'
                    :title = "currentObj.name ? currentObj.name : 'No title'"
                    :text = "currentObj.text ? currentObj.text : 'No text'"/>
    </template>
    <template v-slot:filter-expansion-menu>

    </template>
    <template v-slot:component-slot>
      <FilmSlider ref='obj' defaultapiaction = 'getval' :defaultordering = 'filmdefaultordering'/>
    </template>
    <template v-slot:expansion-menu>
      <v-spacer></v-spacer>
      <div class = 'text-left'>
        <v-list>
          <v-list-item-group v-model="filter">
            <v-list-item
              v-for="one in filterItems"
              :key="one.text"
              :value = 'one.value'
            >
              <v-list-item-content>
                <v-list-item-title v-text="one.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </template>
  </MainLayout>
</template>
<script>
import FilmSlider from "@/components/kinoinfo_components/film_listing/FilmSlider"
import MainLayout from "@/components/global/layouts/MainLayout"
import InfoOverlay from "@/components/global/overlays/InfoOverlay"
import { bus } from "@/bus/bus.js"
export default {
  name: 'slide-view',
  components: {
    FilmSlider,
    MainLayout,
    InfoOverlay,
  },
  mounted() {
    bus.$on('overlay', (obj) => {
      this.overlay = !this.overlay
      this.currentObj = obj
      console.log(this.currentObj)
    });
    bus.$on('clean', () => {
      this.filter = null
      this.currentTitle = 'Киноафиша'
    })
  },
  data () {
    return {
      // Иконки соц сетей для футера
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
      //
      filterItems: [
        {text: 'Новые', value: 'New'},
        {text: 'Популярные', value: 'Popular'},
        {text: 'Фильмы этой недели', value: 'ThisWeek'},
        {text: 'Фильмы этого месяца', value: 'ThisMonth'},
        {text: 'Скоро на экранах', value: 'MonthForward'},
      ],
      expMenuElements: [
        {text: "В кинотеатрах", value: '1'},
        {text: "Скоро", value: '2'},
        {text: "Рекомендации", value: '3'},
        {text: "Бокс-Офис", value: '4'},
        {text: "Обзоры, мнения и комментарии", value: '5'},
        {text: "Мегакритик", value: '6'},
      ],
      filter: 'Popular', //   Значение фильтра по рейтингам и прочему
      timeFilter: null,  // Значение фильтра по времени
      overlay: false, // Значение оверлея, изменяется событием в шине событий
      currentTitle: 'Киноафиша', // Текущий заголовк в меню
      currentObj: null, // Обьект полученный для модалки инфо (горизонтальная пагинация)
      filmdefaultordering: '-imdb_votes',
    }
  },
  watch: {
    // Следит за значением сортировки, оповещает слайер фильмов при изменении
    filter(val) {
      this.$refs.obj.onClickToggleSortButton(val)
      console.log(val);
      let title = this.lodash.find(this.filterItems, function (item){
      return item.value === val;
    });
      this.currentTitle = title.text
    },
  },
}

</script>
<style lang=scss>
.toggle-component {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
.menu-place {
  position: absolute;
  margin: 17px;
  margin-right: 30px;
}
</style>
