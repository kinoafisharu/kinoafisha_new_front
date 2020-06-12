<template>
  <v-sheet
    height="inherit"
    class="overflow-hidden"
    style="position: relative;"
  >
    <v-container fluid = 'true'>
      <div class = 'slide-view-wrapper'>

          <div class = 'menu-place'>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          </div>
          <div class='toggle-component'>

            <v-col
                  cols="12"
                  sm="3"
                  class="py-2"
                >

                  <v-btn-toggle
                    v-model="toggleData"
                    tile
                    color="blue-gray"
                    group
                  >
                    <v-btn value="Stories">
                      Stories
                    </v-btn>

                    <v-btn value="Films">
                      Films
                    </v-btn>

                  </v-btn-toggle>
                </v-col>
          </div>
          <FilmSlider ref = 'obj' :defaultordering = 'filmdefaultordering' defaultapiaction = 'getval' v-if = "toggleData == 'Films'"/>
          <StorySlider ref = 'obj' :defaultordering = 'storydefaultordering' defaultapiaction = 'getval' v-if = "toggleData == 'Stories'"/>
        </div>
      </v-container>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          {{toggleData}}
        </v-list-item-title>
        <v-list-item-subtitle>
          Меню в разработке
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

      <v-divider></v-divider>


      <template>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>Здесь будут настройки!</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-col class="d-flex" cols="20" sm="16">
               <v-select
                  v-model = 'toggleFilter'
                 :items="['Новые','Популярные','Личности']"
                 auto
                 solo
                 label="Фильтр"
                 dense
               ></v-select>
             </v-col>
             <v-col class="d-flex" cols="20" sm="16">
              <v-select
                :items="['Хорошего','Вам','Дня! (ночи, утра, вечера)']"
                solo
                label="Параметры"
                dense
              ></v-select>
            </v-col>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>


    </v-navigation-drawer>
  </v-sheet>



</template>
<script>
import FilmSlider from "@/components/kinoinfo_components/film_listing/FilmSlider"
import StorySlider from "@/components/stories_components/story_listing/StorySlider"
export default {
  name: 'slide-view',
  components: {
    FilmSlider,
    StorySlider,
  },
  data () {
    return {
      items: {'Новые':'New','Популярные':'Popular','Личности':'Persons'},
      drawer: null,
      toggleData: 'Story',
      filmdefaultordering: 'id',
      storydefaultordering: 'id',

    }
  },
  watch: {
    toggleFilter(value) {
      this.$refs.obj.onClickToggleSortButton(value)
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
