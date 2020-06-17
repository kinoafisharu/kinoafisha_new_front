<template>
  <v-sheet
    height="inherit"
    class="overflow-hidden"
    style="position: relative;"
  >
    <v-container>
      <div class = 'slide-view-wrapper'>

          <v-toolbar dense flat>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>


             <v-toolbar-title>IKar Studio</v-toolbar-title>

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

                   <slot name="filter-expansion-menu"></slot>

                 <v-card-actions>
                   <v-spacer></v-spacer>

                   <v-btn text @click="menu = false">Cancel</v-btn>
                 </v-card-actions>
               </v-card>
             </v-menu>
           </v-toolbar>
        </div>
        <slot
        v-bind:defaultapiaction = 'defaultapiaction'
        v-bind:defaultordering = 'defaultordering'
         name="component-slot"></slot>
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

      <v-list-item-group class="grow">
        <v-list-item to = '/kinoafisha' value = 'Films'>
          <v-list-item-title>Films</v-list-item-title>
        </v-list-item>
        <v-list-item to = '/stories' value = 'Stories'>
          <v-list-item-title>Stories</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
      <slot name="expansion-menu"></slot>

    </v-navigation-drawer>
    <slot name="footer"></slot>
  </v-sheet>

</template>
<script>

export default {
  name: 'slide-view',
  components: {

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
      filter: null,
      drawer: null,
      menu: false,
      toggleData: 'Films',
      filmdefaultordering: '-imdb_votes',
      storydefaultordering: 'id',

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
