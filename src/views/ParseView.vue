<template>
  <v-container>
    <template>
      <component :is = 'currentComp'>
          <v-select
            v-model = 'currentComp'
            :items="items"
            label= "Тип действия"
          ></v-select></component>
    </template>
  </v-container>
</template>
<script>
import FilmDotImdbParse from "@/components/parsing_components/FilmDotImdbParse"
import FilmDotKinoinfoParse from "@/components/parsing_components/FilmDotKinoinfoParse"
import FilmStreamKinoinfoParse from '@/components/parsing_components/FilmStreamKinoinfoParse'
export default {
  name: 'parseform',
  components: {
    FilmDotImdbParse,
    FilmDotKinoinfoParse,
    FilmStreamKinoinfoParse

  },
  data() {
    return {
      currentComp: 'FilmDotImdbParse',
      items: [
        {text: 'Точечно (рейтинг и голоса), imdb', value: 'FilmDotImdbParse'},
        {text: 'Точечно (постер), kinoinfo', value: 'FilmDotKinoinfoParse'},
        {text: 'Потоком (релизы), kinoinfo', value: 'FilmStreamKinoinfoParse'}
      ]
    }
  },
  methods: {
  }
}
</script>
<style scoped lang='scss'>
</style>
