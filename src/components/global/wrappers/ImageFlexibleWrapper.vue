<template>
<div class='postercontainer'>

  <div class="poster">
    <!-- Отображение постера елемента если такой есть -->
    <img v-if = 'imgsrc' class="poster-image" :src="imgsrc">
    <div v-else>
      <img class="poster-image" src = 'https://ic.pics.livejournal.com/philologist/23000738/2376603/2376603_original.jpg'/>
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
  },
  data () {
  return {
    publicPath: process.env.BASE_URL
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


.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
