<template>
  <MainLayout :title = 'currentTitle' ref = 'ml'>
    <template v-slot:overlay>
      <InfoOverlay  v-if = 'currentObj'
                    :title = "currentObj.name ? currentObj.name : 'No title'"
                    :text = "currentObj.text ? currentObj.text : 'No text'"/>
    </template>
    <template v-slot:filter-expansion-menu>

    </template>
    <template v-slot:component-slot>
      <FilmSlider
      ref='obj'
      :sort_and_date = "filter"
      />
    </template>
    <template v-slot:expansion-menu-head>
      <div class = 'text-left'>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{getTitle}}
          </v-list-item-title>
          <div class="text-center">
            <v-menu
              v-model="settings"
              :close-on-content-click="false"
              offset-x
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  absolute
                  x-small
                  fab
                  right
                  bottom
                  v-bind="attrs"
                  v-on="on">
                  <v-icon>mdi-tools</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-list>
                  <v-list-item-group mandatory v-model="defaultFilter">
                    <v-list-item
                      @click = '$refs.ml.drawer = false'
                      v-for="one in filterItems"
                      :key="one.text"
                      :value = 'one.value'
                    >
                      <v-list-item-content>
                        <v-list-item-title v-text="one.text"></v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn center text @click="settings = false">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </div>
          <v-list-item-subtitle>
            IKar Studio
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </div>
    </template>
    <template v-slot:expansion-menu>
      <v-spacer></v-spacer>
      <div class = 'text-left'>
        <v-list nav>
          <v-list-item-group mandatory v-model="filter">
            <v-list-item
              @click = '$refs.ml.drawer = false'
              v-for="one in filterItems"
              :key="one.text"
              :value = 'one.value'
            >
              <v-list-item-content>
                <v-list-item-title v-text="one.text"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
              </v-list-item-action>
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
//import utils from "@/utils/utils.js"
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
    });
    bus.$on('clean', () => {
      this.filter = null
      this.currentTitle = 'Киноафиша'
    })
    let item = localStorage.getItem('defaultFilter')
    if (!item) {
      localStorage.setItem('defaultFilter', '-imdb_votes')
    }


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
      //  {text: 'Новые', value: '-release__release,-year'},
        {text: 'Популярные', value: '-imdb_votes'},
        {text: 'Фильмы этой недели', value: '-imdb_votes?backfromnow,7'},
      //  {text: 'Фильмы этого месяца', value: '-imdb_votes?backfromnow,30'},
        {text: 'Скоро на экранах', value: '-imdb_votes?forwardfromnow,30'},
      ],
      expMenuElements: [
        {text: "В кинотеатрах", value: '1'},
        {text: "Скоро", value: '2'},
        {text: "Рекомендации", value: '3'},
        {text: "Бокс-Офис", value: '4'},
        {text: "Обзоры, мнения и комментарии", value: '5'},
        {text: "Мегакритик", value: '6'},
      ],
      filter: localStorage.getItem('defaultFilter'), // Значение фильтра по рейтингам и прочему
      defaultFilter: localStorage.getItem('defaultFilter'),
      overlay: false, // Значение оверлея, изменяется событием в шине событий
      currentTitle: 'Киноафиша', // Текущий заголовк в меню
      currentObj: null, // Обьект полученный для модалки инфо (горизонтальная пагинация)
      settings: false,
    }
  },
  watch: {
    // Следит за значением сортировки, оповещает слайер фильмов при изменении
    filter(val) {
      this.$refs.obj.updateOrderingAndFilters(val)
      console.log(val);
      let title = this.lodash.find(this.filterItems, function (item){
      return item.value === val;
    });
      this.currentTitle = title.text
    },
    defaultFilter(val) {
      localStorage.setItem('defaultFilter', val)
    }
  },
  methods: {
    onClickMenuSettings: function() {
      this.settings = !this.settings
    },
    onClickToggleDefaults: function() {
      this.$refs.ml.drawer = false
      this.settings = !this.settings
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
