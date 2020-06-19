
<script>
//Миксин создает запрос в апи для получения соответствующих обьектов
//Нужен для пагинации в слайдере, для первичного отображения
//Принимает обьект с параметрами для GET запроса
export default {
  data() {
    return {
      currentPage: 1,
      //objarr: null,
    }
  },
  methods: {
    // Функция создает мутацию и достает данные из хранилища
    makeRequest: async function(dispatcher, requestObject) {
      await this.$store.dispatch(dispatcher, requestObject)
    },
  }
}
</script>
