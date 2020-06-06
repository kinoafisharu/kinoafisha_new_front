<template>
  <Story :story = 'story' @go-right = 'goRight' @go-left = 'goLeft'/>
</template>


<script>
// Главная страница компонента историй, пока что принимает значение одной истории в виде обьекта
import Story from "@/components/stories_components/Story"
export default {
  name: 'story-set',
  components: {
    Story,
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

  }


}
</script>
