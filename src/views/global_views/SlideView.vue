<template>
  <v-sheet
    height="inherit"
    class="overflow-hidden"
    style="position: relative;"
  >
  <v-overlay
    :z-index="3"
    :value="overlay"
  >
    <v-btn
      class="white--text"
      color="teal"
      @click="overlay = false"
    >
      Hide Overlay
    </v-btn>
  </v-overlay>
    <v-container>
      <div class = 'slide-view-wrapper'>

          <v-toolbar dense flat>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>


             <v-toolbar-title>Title</v-toolbar-title>

             <v-spacer></v-spacer>

             <v-btn icon>
               <v-icon>mdi-magnify</v-icon>
             </v-btn>

             <v-menu
               v-model="menu"
               :close-on-content-click="false"
               offset-x
             >
               <template v-slot:activator="{ on, attrs }">
                 <v-btn icon v-bind = 'attrs' v-on = 'on'>
                   <v-icon>mdi-dots-vertical</v-icon>
                 </v-btn>
               </template>

               <v-card>
                 <v-list>
                   <v-list-item>

                     <v-list-item-content>
                       <v-list-item-title>Окно доп. настроек</v-list-item-title>
                       <v-list-item-subtitle>В разработке</v-list-item-subtitle>
                     </v-list-item-content>

                     <v-list-item-action>
                     </v-list-item-action>
                   </v-list-item>
                 </v-list>

                 <v-divider></v-divider>

                   <template>
                     <v-expansion-panels>
                       <v-expansion-panel>
                         <v-expansion-panel-header>Настройки</v-expansion-panel-header>
                         <v-expansion-panel-content>
                           <v-col class="d-flex" cols="20" sm="16">
                            <v-select
                               v-model = 'e1'
                              :items="['Новые', 'Популярные', 'Личности']"
                              solo
                              label="Фильтр"
                              dense
                            ></v-select>
                          </v-col>
                          <v-col class="d-flex" cols="20" sm="16">
                           <v-select
                              v-if = "toggleData == 'Films'"
                             :items="['На этой неделе в кинотеатрах', 'На этой неделе онлайн', 'Лучшее в кинотеатрах', 'Лучшее онлайн', 'Бокс-офис уикенда', 'Топ 250']"
                             solo
                             label="Подборки"
                             dense
                           ></v-select>
                         </v-col>
                         </v-expansion-panel-content>
                       </v-expansion-panel>
                     </v-expansion-panels>
                   </template>

                 <v-card-actions>
                   <v-spacer></v-spacer>

                   <v-btn text @click="menu = false">Cancel</v-btn>
                 </v-card-actions>
               </v-card>
             </v-menu>
           </v-toolbar>
          <FilmSlider ref = 'obj' :defaultordering = 'filmdefaultordering' defaultapiaction = 'getval' v-if = "toggleData == 'Films'" @zoom = 'onClickZoomButton'/>
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

      <v-list-item-group v-model = 'toggleData' class="grow">
        <v-list-item value = 'Films'>
          <v-list-item-title>Films</v-list-item-title>
        </v-list-item>
        <v-list-item value = 'Stories'>
          <v-list-item-title>Stories</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>В кинотеатрах</v-expansion-panel-header>
          <v-expansion-panel-content>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Скоро</v-expansion-panel-header>
          <v-expansion-panel-content>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Рекомендации</v-expansion-panel-header>
          <v-expansion-panel-content>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Бокс-Офис</v-expansion-panel-header>
          <v-expansion-panel-content>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Обзоры, мнения и комментарии</v-expansion-panel-header>
          <v-expansion-panel-content>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>
             Мегакритик
          </v-expansion-panel-header>
          <v-expansion-panel-content>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>




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
      e1: null,
      links: ['Home', 'Contacts', 'Settings'],
      drawer: null,
      menu: false,
      overlay: false,
      toggleData: 'Films',
      filmdefaultordering: 'id',
      storydefaultordering: 'id',

    }
  },
  watch: {
    e1(value) {
      let query = null
      if (value == 'Популярные') {query = 'Popular'}
      else if (value == 'Новые') {query = 'New'}
      else if (value == 'Личности') {query = 'New'}
      this.$refs.obj.onClickToggleSortButton(query)

      }
    },
  methods: {
    onClickZoomButton: function() {
      this.overlay = !this.overlay
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
