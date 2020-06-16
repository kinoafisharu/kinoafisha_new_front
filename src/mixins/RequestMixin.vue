
<script>
export default {
  data() {
    return {
      currentPage: 1,
      objarr: null,
    }
  },
  methods: {
    makeRequest: async function(dispatcher, requestObject) {
       await this.$store.dispatch(dispatcher, requestObject)
      let objarr = null
      if (dispatcher == 'getFilms') { objarr = await this.$store.getters.films}
      else if (dispatcher == 'getStories') { objarr = await this.$store.getters.stories}
      this.objarr = objarr
    },
  }
}
</script>
