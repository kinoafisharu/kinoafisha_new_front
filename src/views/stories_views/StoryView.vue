<template>
  <Story v-if = 'story' :story = 'story' />
  <h2 v-else> loading... </h2>
</template>


<script>
// Главная страница компонента историй, пока что принимает значение одной истории в виде обьекта
import Story from "@/components/stories_components/Story"
export default {
  name: 'story-view',
  props: {
    id: String,
  },
  components: {
    Story,
  },
  data () {
    return {
      fid: this.id,
      story: null,
    }
  },
  async created() {
     await this.$store.dispatch('getStories', {currentPage: 1})
     let storyobj = await this.$store.getters.stories
     this.story = storyobj.find(obj => obj.id == this.id)
     console.log(this.story)
  },
  methods: {
    onSwipeLeft: function() {
      this.fid ++
      this.story = this.$store.getters.stories.find(obj => obj.id == this.fid)
    },
    onSwipeRight: function() {
      this.fid --
      this.story = this.$store.getters.stories.find(obj => obj.id == this.fid)
    }
  }
}
</script>


<style scoped lang='scss'>

</style>
