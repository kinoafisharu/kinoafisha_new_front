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
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
    <template v-slot:component-slot>
      <StorySlider ref='obj' :defaultordering = 'storydefaultordering'/>
    </template>
    <template v-slot:expansion-menu>
    </template>
  </MainLayout>
</template>
<script>
import StorySlider from "@/components/stories_components/story_listing/StorySlider"
import MainLayout from "@/components/global/layouts/MainLayout"
export default {
  name: 'slide-view',
  components: {
    StorySlider,
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
      filter: null,
      drawer: null,
      menu: false,
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
