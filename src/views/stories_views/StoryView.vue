<template>
  <StorySet/>
</template>


<script>
// Главная страница компонента историй, пока что принимает значение одной истории в виде обьекта
import StorySet from "@/components/stories_components/StorySet"
export default {
  name: 'story-view',
  components: {
    StorySet,
  },
  created() {
    this.$store.dispatch('getStories', {by: '-dtime', amount: 5})
  },
  methods: {
    updateSorting: function(by) {
      this.$store.dispatch('getStories', {by: by, amount: 5})
    }
  }

}
</script>


<style scoped lang='scss'>

</style>
