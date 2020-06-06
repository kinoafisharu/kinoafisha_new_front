<template>
  <StorySet :story = 'story' />
</template>


<script>
// Главная страница компонента историй, пока что принимает значение одной истории в виде обьекта
import StorySet from "@/components/stories_components/StorySet"
export default {
  name: 'story-view',
  props: {
    id: String,
  },
  components: {
    StorySet,
  },
  created() {
    this.$store.dispatch('getStory', {id: this.id})
  },
  computed: {
    story: function() {
      return this.$store.getters.story
    }
  }

}
</script>


<style scoped lang='scss'>

</style>
