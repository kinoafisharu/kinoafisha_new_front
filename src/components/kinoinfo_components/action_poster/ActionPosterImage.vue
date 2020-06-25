<template>
<ImageFlexibleWrapper ref='ifw' :imgsrc = 'cposter ? cposter : imgsrc' 
                                :title = 'title'
                                @imgerr = 'onErrorImage'
                                @imgload = 'onLoadImage'>
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
    poster: String,
  },

  data () {
    return {
      imgTail: '-001.jpg',
      errcount: 0,
      imgLoaded: false,
      imgErr: false,
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
    cposter() {
      if (this.poster) {
        return this.poster
      } else {
        return null
      }
    },
    // Вычисляет URL изображения
    imgsrc() {
      if (!this.imgErr) {
        if (this.kid) {
          let kid = this.kid
          let thousand = Math.trunc(Number(kid) / 1000) + 1 // какая тысяча. используется в URL.
          let url = "http://posters.kinoafisha.ru/" + thousand + "/" + String(kid) + `${this.imgTail}`
          console.log(url)
          return url
        } else {
          return null
        }
      } else {
        return 'https://source.unsplash.com/350x540?nature,water'
      }
    }
},
  methods: {
    // WARNING
    // Ловит событие imgerr, инкрементирует счетчик ошибок
    // На основе условных операторов перебирает возможные оконачния URL постеров
    // Затем свойство imgsrc реагирует на изменение URL и Динамически обновляет
    // Картинку в ImageFlexibleWrapper на что та в свою очередь снова выдает ошибку
    // Либо загружается и цикл останавливается
     onErrorImage: function() {
        if (this.errcount == 0  & !this.imgLoaded) this.imgTail = '-002.jpg'
        else if (this.errcount == 1 & !this.imgLoaded) this.imgTail = '-000.jpg'
        else if (this.errcount == 2 & !this.imgLoaded) this.imgTail = '-000.png'
        else if (this.errcount == 3 & !this.imgLoaded) this.imgTail = '-001.png'
        else if (this.errcount == 4 & !this.imgLoaded) this.imgTail = '-003.jpg'
        else if (this.errcount == 5 & !this.imgLoaded) this.imgTail = '-004.jpg'
        else if (this.errcount == 6 & !this.imgLoaded) this.imgTail = '-005.jpg'
        else if (this.errcount == 7 & !this.imgLoaded) this.imgTail = '-006.jpg'
        else if (this.errcount == 8 & !this.imgLoaded) this.imgTail = '-008.jpg'
        else if (this.errcount == 9 & !this.imgLoaded) this.imgTail = '-020.jpg'
        else this.imgErr = true
        console.log(this.errcount);
        this.errcount ++
    },
  // Если картинка загужена - цикл останавливается
  onLoadImage: function() {
      this.imgLoaded = true
    }
  }
}


</script>

<style scoped lang='scss'>

#image-flexible-wrapper {
  z-index: -1;
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
