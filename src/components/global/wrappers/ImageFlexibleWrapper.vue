<template>
 <!-- Оборачивает в себя картинку, если картинки нет, вызывает родительский метод ошибки -->
<div class='postercontainer'>
  <transition name= "fade">
  <div class="poster">
    <!-- Отображение постера елемента если такой есть -->
      <img ref ='img' v-if = 'imgsrc && !imgErr' class="poster-image" :src="imgsrc" @error = 'onErrorImage' @load = 'onLoadImage'>

    <div v-else>
      <img class="poster-image" :src = 'randomSrc'/>
      <div v-if ='!imgsrc || imgErr' id = 'exttitle'>
        <h1 id = 'exttitle'>{{title}}</h1>
      </div>
    </div>
    <slot></slot>
  </div>
  </transition>
</div>

</template>

<script>

export default {
  // Обертка для картинок, берет в себя путь к картинке в виде пропса, оборачивает картинку в блок с заданной макс шириной и высотой
  // Картинка при этом масштабируется под ширину и высоту viewport
  name: 'image-flexible-wrapper',
  props: {
    imgErr: Boolean,
    imgsrc: String,
    title: String,
  },
  data () {
  return {
    imgerrored: false,
    publicPath: process.env.BASE_URL,
  }
},
methods: {
  onErrorImage: function() {
      this.$emit('imgerr')
      console.log('emitting');
  },
  onLoadImage: function() {
    console.log('sucess');
    this.$emit('imgload')
  },
},
computed: {
  randomSrc: function() {
    let src = `https://source.unsplash.com/350x540?nature,water`
    return src
  }
}
}
</script>

<style scoped lang='scss'>


.postercontainer {
    max-width: 100%;
    max-height: 100%;
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
    #noimg {
      position: absolute;
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
  #exttitle {
    z-index: 1;
    background-color: black;
    color: white;
    opacity: 0.8;
    background-blend-mode: darken;
    cursor: pointer;
    position: absolute;
    top: 0;
    font-size: 1.2em;
    width: 100%;
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
