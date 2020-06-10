<template>
  <div class = 'poster-block'>
    <ImageFlexibleWrapper imgsrc = 'https://ic.pics.livejournal.com/philologist/23000738/2376603/2376603_original.jpg'>
      <transition name = 'fade'>
        <div id = 'exttitle' @click = 'onClickExternalTitle'>
          <transition name = 'fade'>
          <h1 id = 'exttitle'>{{obj.title}}</h1>
          </transition>
        </div>
      </transition>
        <StoryActionElementsLayer
                                :description='obj.text'
                                :title='obj.title'
                                :sectionConfig = 'sectionConfig'
                                likes = 0
                                dislikes = 0
                                tohtml = true>
        </StoryActionElementsLayer>
    </ImageFlexibleWrapper>
  </div>
</template>

<script>
  import StoryActionElementsLayer from "@/components/stories_components/layers/StoryActionElementsLayer.vue"
  import ImageFlexibleWrapper from "@/components/global/wrappers/ImageFlexibleWrapper"
  export default {
    name: 'objdetail',
    components: {
      StoryActionElementsLayer,
      ImageFlexibleWrapper,
    },
    //id received from router CHAIN |- FIlmDetailView => FilmDetail => FilmPoster
    props: {
      obj: Object,
    },
    /// send id from porps here to receive a obj object
    data () {
      return {
        sectionConfig: {
                        spantext2: 'Прочел, рекомендую',
                        spantext3: 'Хочу прочесть',
                        spantext4: 'Прочел, не рекомендую',
                        spantext5: 'Не буду читать',
                        buttonimage2: 'like.png',
                        buttonimage3: 'like.png',
                        buttonimage4: 'dislike.png',
                        buttonimage5: 'sad.png',
                        likepath: 'story',
                        excfirstOption: true,
                      }
      }
    },
    methods: {
      onClickExternalTitle: function() {
        this.$refs.StoryActionElementsLayer.parentOnClickExternalTitle
      }
    }
}

</script>

<style scoped lang='scss'>
.poster-block {
  width: 100%;
  height: 100%;
}
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
#action-elements-layer {
  #like-section {
    height: 15%;
    top: 73%;
  }
}
#exttitle {
  z-index: 1;
  background-color: black;
  color: white;
  opacity: 0.6;
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
