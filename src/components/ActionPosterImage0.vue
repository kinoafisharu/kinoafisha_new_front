<template>
<div class='postercontainer'>

  <div class="poster">

    <!-- Отображение постера елемента если такой есть -->
    <img v-if='imgsrc' class="poster-image" :src="imgsrc">
    <h1 v-else>This element doesn't have an image yet</h1>
    <ActionElementsLayer  :description='description'
                          :title='title'
                          :rate='rate'
                          :comment='comment'
                          :year='year'
                          :country='country'
                          :genre='genre'
                          :likes = 'likes'
                          :dislikes = 'dislikes'
                          :limit = 'limit'
                          :id = 'id'/>



      <!-- Sekcii wsplivaushih okon laikov -->

    </div>
  </div>

</template>

<script>
import ActionElementsLayer from "@/components/ActionElementsLayer"
import service from '@/api/base.js'

export default {
  components: {
    ActionElementsLayer
  },
  props: {
    limit: String,
    kid: Number,
    title: String,
    genre: Array,
    description: String,
    rate: Number,
    commentnt: String,
    year: Number,
    country: Array,
    likes: Number,
    dislikes: Number,
    id: Number,
  },
  data () {
    return {

    }
  },
  methods: {

    // В будущем переделать на абстракцию!!
    giveDislike: function(evaluation) {
      this.show_dislike_section = !this.show_dislike_section
      if (this.dislike_given) {
        console.log("Can't give dislike, you've already voted")
      } else {
      service.post(`films/${this.id}/like/`, {
          evaluation: evaluation,
        })
        .then((response) => {
          if (response.data['liked'] == true) this.dislike_given = true
        })
        .catch((error) => {
          console.log(error)
        })
        this.dataDislikes ++
      console.log("give_dislike")
    }
  }

  },
  computed: {
    imgsrc: function() {
      if (this.kid) {
        let kid = this.kid
        let thousand = Math.trunc(Number(kid) / 1000) + 1 // какая тысяча. используется в URL.
        let url = "http://posters.kinoafisha.ru/" + thousand + "/" + String(kid) + "-001.jpg"
        console.log(url)
        return url
      } else {
        return null
      }
    },
    width: function() {
      return window.innerWidth
    },
    height: function() {
      return window.innerHeight
    },
  }
}
</script>

<style scoped lang='scss'>
@media (orientation: portrait) and (max-width: 600px) {
    .postercontainer {
        max-width: 100vw !important;
        max-height: 100vh !important;
        position: relative !important;
    }
    .poster {
        width: 100% !important;
        height: 100% !important;
        text-align: center !important;
    }
    .poster-image {
        max-width: 100% !important;
        max-height: 100% !important;
    }
    img {
        max-width: 100% !important;
        max-height: 100% !important;
        vertical-align: top !important;
    }
}



.postercontainer {
    max-width: 25%;
    max-height: 50%;
    margin: 0 auto;
    align-items: stretch;
    position: relative;
    .poster {
        max-width: 100%;
        max-height: 100%;
        img {
            display: flex;
            flex-direction: column;
        }
    }
}



.poster {
    position: relative;
    text-align: center;
    flex: 1;
    height: 100%;
    .poster-image {
        height: 100%;
        width: 100%;
        img {
            width: 100%;
            height: 100%;
        }
    }
  }


.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
