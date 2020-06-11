<template>


<ImageFlexibleWrapper :imgsrc = 'imgsrc' :title = 'title'>
    <ActionElementsLayer   :description='description'
                            :title='title'
                            :rate='rate'
                            :comment='comment'
                            :year='year'
                            :country='country'
                            :genre='genre'
                            :likes = 'likes'
                            :dislikes = 'dislikes'
                            :limit = 'limit'
                            :id = 'id'
                            :sectionConfig = 'sectionConfig'
                            :tohtml = "true"/>


</ImageFlexibleWrapper>

</template>

<script>
// Компонент постера с акт. элементами kinoinfo
// Принимает в себя описанные пропсы без каких либо особенностей
import ActionElementsLayer from "@/components/kinoinfo_components/action_poster/ActionElementsLayer"
import ImageFlexibleWrapper from "@/components/global/wrappers/ImageFlexibleWrapper"



export default {
  components: {
    ActionElementsLayer,
    ImageFlexibleWrapper,
  },
  props: {
    limit: String,
    kid: Number,
    title: String,
    genre: Array,
    description: String,
    rate: Number,
    comment: String,
    year: Number,
    country: Array,
    likes: Number,
    dislikes: Number,
    id: Number,
  },

  data () {
    return {
      imageerror: false,
      sectionConfig: {
                      spantext1: 'Хочу посмотреть в кинотеатре',
                      spantext2: 'Хочу посмотреть дома',
                      spantext3: 'Смотрел, рекомендую',
                      spantext4: 'Фильм мне не интерестен',
                      spantext5: 'Не буду смотреть',
                      buttonimage1: 'film.png',
                      buttonimage2: 'computer.png',
                      buttonimage3: 'like.png',
                      buttonimage4: 'dislike.png',
                      buttonimage5: 'sad.png',
                      likepath: 'film',
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
  methods: {
    onErrorImage: function() {
      this.imageerror = true
    }
  }
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

#image-flexible-wrapper {
  z-index: -1;
}


::v-deep .postercontainer {
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



::v-deep .poster {
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
