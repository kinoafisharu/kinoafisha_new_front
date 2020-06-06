<template>
  <Story0 :obj = 'story' @go-right = 'goRight' @go-left = 'goLeft'/>
</template>


<script>
// Главная страница компонента историй, пока что принимает значение одной истории в виде обьекта
import Story0 from "@/components/stories_components/Story0"
export default {
  name: 'story-set',
  components: {
    Story0,
  },
  props: {
    story: Object,
  },
  data () {
    return {
      errored: false,
      counter: 0,
    }
  },
  computed: {

  },
  methods: {
    goRight: function() {
      this.$router.push({path: `stories/${this.story.id + 1}`})
    },
    goLeft: function() {
      this.$router.push({path: `stories/${this.story.id - 1}`})
    }
  }


}
</script>
