<template>
  <MainLayout>
    <template v-slot:filter-expansion-menu>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Настройки</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-col class="d-flex" cols="20" sm="16">
             <v-select
                v-model = 'filter'
               :items="filterItems"
               item-value = 'value'
               item-text = 'text'

               label="Фильтр"
               dense
             ></v-select>
           </v-col>
           <v-col class="d-flex" cols="20" sm="16">
             <v-select
                v-model = 'filter'
               :items="timeItems"

               label="Время"
               dense
             ></v-select>
           </v-col>
           <v-col class="d-flex" cols="20" sm="16">
            <v-select
               v-model = 'filter'
              :items="['На этой неделе в кинотеатрах', 'На этой неделе онлайн', 'Лучшее в кинотеатрах', 'Лучшее онлайн', 'Бокс-офис уикенда', 'Топ 250']"

              label="Подборки"
              dense
            ></v-select>
          </v-col>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
    <template v-slot:component-slot>
      <FilmSlider ref='obj' defaultapiaction = 'getval' :defaultordering = 'filmdefaultordering'/>
    </template>
    <template v-slot:expansion-menu>
      <div v-for = 'element in expMenuElements' :key = 'element.value'>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>{{element.text}}</v-expansion-panel-header>
            <v-expansion-panel-content>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </template>
  </MainLayout>
</template>
<script>
import FilmSlider from "@/components/kinoinfo_components/film_listing/FilmSlider"
import MainLayout from "@/components/global/layouts/MainLayout"
export default {
  name: 'slide-view',
  components: {
    FilmSlider,
    MainLayout,
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
        {text: 'Личности', value: 'No'},
      ],
      timeItems: [
        {text: 'Эта неделя', value: 'ThisWeek'},
        {text: 'Этот месяц', value: 'ThisMonth'},
        {text: 'Скоро выйдут', value: 'MonthForward'}
      ],
      expMenuElements: [
        {text: "В кинотеатрах", value: '1'},
        {text: "Скоро", value: '2'},
        {text: "Рекомендации", value: '3'},
        {text: "Бокс-Офис", value: '4'},
        {text: "Обзоры, мнения и комментарии", value: '5'},
        {text: "Мегакритик", value: '6'},
      ],
      filter: null,
      drawer: null,
      menu: false,
      filmdefaultordering: '-imdb_votes',
    }
  },
  watch: {
    filter(val) {
      this.$refs.obj.onClickToggleSortButton(val)
    }
  }
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
