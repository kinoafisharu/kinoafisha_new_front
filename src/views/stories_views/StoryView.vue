<template>
  <Story v-if = '!loading' :story = 'story'/>
  <p v-else-if = 'errored'>ERROR</p>
  <p v-else>loading...</p>
</template>


<script>
// Главная страница компонента историй, пока что принимает значение одной истории в виде обьекта
import Story from "@/components/stories_components/Story"
import service from "@/api/base.js"
export default {
  name: 'story-view',
  components: {
    Story,
  },
  data () {
    return {
      errored: false,
      loading: true,
      story: null,
    }
  },
  //  Функция ниже - на переелку, переместить данные о историях в хранилище Vuex
  // // WARNING: CHANGE TO STORAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  mounted() {
    service.get('texts/stories/')
    .then(response => {this.story = response.data.results[0]})
    .catch( error => {
      console.log(error);
      this.errored = true
    })
    .finally(() => {this.loading = false})

}
}
</script>


<style scoped lang='scss'>

</style>
