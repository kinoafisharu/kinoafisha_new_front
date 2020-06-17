
<script>
//Миксин создает запрос в апи для получения соответствующих обьектов
//Нужен для пагинации в слайдере, для первичного отображения
//Принимает обьект с параметрами для GET запроса
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
