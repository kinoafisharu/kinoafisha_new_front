<template>
  <Story v-if = '!loading' :story = 'story'/>
  <p v-else-if = 'errored'>ERROR</p>
  <p v-else>loading...</p>
</template>


<script>
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
  mounted() {
    service.get('news/')
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
