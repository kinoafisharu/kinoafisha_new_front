
<script>
export default {
  data() {
    return {
      currentPage: 1,
    }
  },
  methods: {
    makeRequest: async function(dispatcher, currentPage, fieldvalues, apiaction, itemordering) {
       await this.$store.dispatch(dispatcher, {currentPage: currentPage,
                                                             values: fieldvalues,
                                                             action: apiaction,
                                                             ordering: itemordering})
      let objarr = null
      if (dispatcher == 'getFilms') { objarr = await this.$store.getters.films}
      else if (dispatcher == 'getStories') { objarr = await this.$store.getters.stories }
      this.objarr = objarr
    },
  }
}
</script>
