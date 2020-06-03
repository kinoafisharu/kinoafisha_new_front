<script>
import service from "@/api/base.js"
export default {
  methods: {
      /* Две функции голоса ниже почти одинаковые, берут целочисленное значение
       и на его основе отправляют нужный запрос по лайку или дизлайку в апи */
      // В будущем переделать на абстракцию!!
      giveLike: function(evaluation) {
        this.show_like_section = !this.show_like_section
        if (this.like_given) {
          console.log("Can't give like, you've already voted")
        } else {
        console.log("give_like")
        service.post(`films/${this.id}/like/`, {
            evaluation: evaluation,
          })
          .then((response) => {
            if (response.data['liked'] == true) this.like_given = true
          })
          .catch((error) => {
            console.log(error)
          })
          this.dataLikes ++
        }
      },
  }
}
</script>
