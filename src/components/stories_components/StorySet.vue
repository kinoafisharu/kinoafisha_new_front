<template>
  <Story :story = 'currentStory' @go-right = 'goRight' @go-left = 'goLeft'/>
</template>


<script>
// Главная страница компонента историй, пока что принимает значение одной истории в виде обьекта
import Story from "@/components/stories_components/Story"
export default {
  name: 'story-set',
  components: {
    Story,
  },
  data () {
    return {
      errored: false,
      counter: 0,
    }
  },
  computed: {
    sStories () {
      return this.$store.getters.stories
    },
    currentStory () {
      return this.sStories[this.counter]
    }
  },
  methods: {
    goRight: function() {
      if (this.counter < this.sStories.length) this.counter ++
    },
    goLeft: function() {
      if (this.counter > 0) this.counter --
    }
  }


}
</script>
