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
      <v-list>
        <v-list-item-group>
            <v-list-item>
              <v-col class = "d-flex" cols="30" sm="16">
               <v-select
                  v-model = 'filter'
                 :items="filterItems"
                 item-value = 'value'
                 item-text = 'text'

                 label="Сортировка"

               ></v-select>
             </v-col>
           </v-list-item>
           <v-list-item>
             <v-col class="d-flex" cols="20" sm="16">
               <v-select
                  v-model = 'timeFilter'
                 :items="timeItems"

                 label="Фильтры"

               ></v-select>
             </v-col>
           </v-list-item>
           <v-col class="d-flex" cols="20" sm="16" v-if = 'showSelections'>
            <v-select
               v-model = 'filter'
              :items="['На этой неделе в кинотеатрах', 'На этой неделе онлайн', 'Лучшее в кинотеатрах', 'Лучшее онлайн', 'Бокс-офис уикенда', 'Топ 250']"

              label="Подборки"
              dense
            ></v-select>
          </v-col>
        </v-list-item-group>
      </v-list>
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
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
      filterItems: [
        {text: 'Новые', value: 'New'},
        {text: 'Популярные', value: 'Popular'},
      ],
      timeItems: [
        {text: 'Фильмы этой недели', value: 'ThisWeek'},
        {text: 'Фильмы этого месяца', value: 'ThisMonth'},
        {text: 'Скоро на экранах', value: 'MonthForward'},
        {text: 'Все', value: null},
      ],
      expMenuElements: [
        {text: "В кинотеатрах", value: '1'},
        {text: "Скоро", value: '2'},
        {text: "Рекомендации", value: '3'},
        {text: "Бокс-Офис", value: '4'},
        {text: "Обзоры, мнения и комментарии", value: '5'},
        {text: "Мегакритик", value: '6'},
      ],
      filter: 'Popular',
      timeFilter: null,
      overlay: false,
      drawer: null,
      menu: false,
      length: 3,
      window: 0,
      currentTitle: 'Киноафиша',
      currentObj: null,
      filmdefaultordering: '-imdb_votes',
    }
  },
  watch: {
    filter(val) {
      this.$refs.obj.onClickToggleSortButton(val)
      let title = this.lodash.find(this.filterItems, function (item){
  return item.value === val;
});
      this.currentTitle = title.text
    },
    timeFilter(val) {
      this.$refs.obj.onClickToggleSortButton(val)
    }
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
