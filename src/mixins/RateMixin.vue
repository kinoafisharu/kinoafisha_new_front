<script>
import service from "@/api/base.js"
export default {
  // Миксин с функцией голоса, отправляет POST запрос в API для голоса за или против определенного фильма
  methods: {
    // Записывает id фильма в куки, переделать на сервер
      giveLike: function(evaluation, object) {
        let path = 'kinoinfo/films/'
        console.log(object);
        console.log(path);
        this.show_like_section = !this.show_like_section
        if (localStorage.getItem(this.id) == this.id) {
          console.log("Can't give like, you've already voted")
          this.$refs.AELWrapper.rateAlert = true
        } else {
        console.log("give_like")
        service.post(`${path}${this.id}/like/`, {
            evaluation: evaluation,
          })
          .then((response) => {
            if (response.data['liked'] == true) {
              this.like_given = true
              localStorage.setItem(this.id, this.id)
            }
          })
          .catch((error) => {
            console.log(error)
          })
          if (evaluation >= 4) {
            this.dataDislikes ++
          } else {
            this.dataLikes ++
          }
        }
      },
  }
}
</script>
