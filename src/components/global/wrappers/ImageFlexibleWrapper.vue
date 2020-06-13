<template>
<div class='postercontainer'>

  <div class="poster">
    <!-- Отображение постера елемента если такой есть -->
    <img ref ='img' v-if = 'imgsrc' class="poster-image" :src="imgsrc" @error = 'onErrorImage' @load = 'onLoadImage'>
    <div v-else>
      <img class="poster-image" src = 'https://source.unsplash.com/random/350x540'/>
      <div v-if ='!imgsrc || imgerrored' id = 'exttitle'>
        <transition name = 'fade'>
        <h1 id = 'exttitle'>{{title}}</h1>
        </transition>
      </div>
    </div>
    <slot></slot>
  </div>
</div>

</template>

<script>

export default {
  // Обертка для картинок, берет в себя путь к картинке в виде пропса, оборачивает картинку в блок с заданной макс шириной и высотой
  // Картинка при этом масштабируется под ширину и высоту viewport
  name: 'image-flexible-wrapper',
  props: {
    imgsrc: String,
    title: String,
  },
  data () {
  return {
    imgerrored: false,
    publicPath: process.env.BASE_URL
  }
},
methods: {
  onErrorImage: function() {
    this.$emit('imgerr')
  },
  onLoadImage: function() {
    this.$emit('imgload')
    console.log('sucess');
  }
},
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
        height: 100% !important;
        width: 100% !important;
        img {
            width: 100%;
            height: 100%;
        }
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
