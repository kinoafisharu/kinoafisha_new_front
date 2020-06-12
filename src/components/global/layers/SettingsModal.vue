<template>
  <div class = 'modal'>
    <h2>
      (А здесь будет окно настройки рейтинга фильма,
      можно будет выводить рейтинг с приоритетных источников)
    </h2>
    <hr>
    <h1>
      Приветствую, дорогой друг!
    </h1>
    <hr>
    <p>
      Если ты просматриваешь этот постер, это уже многое для нас значит,
      сейчас данный ресурс находится в разработке отважными участниками
      нашей команды (I-Kar), если тебе нравится идея и ты желаешь помочь проекту,
      просим оправить любые пожелания, личные идеи, и прочее на нашу почту,
      ответим всем и каждому!
    </p>
    <CrossButton class='cross-button' @click.native = 'close'/>
  </div>
</template>

<script>
// Слой настроек, под доделку
import CrossButton from "@/components/global/buttons/CrossButton"
export default {
  name: 'settingsmodal',
  components: {
    CrossButton,
  },
  props: {

  },
  methods: {
    close: function() {
      this.$emit('close')
    },
  },
  computed: {

  }
}
</script>

<style scoped lang = "scss">
.modal {
  width: inherit;
  height: 91%;
  overflow-y: auto;
  position: absolute;
  color: white;
  top: 0;
  bottom:0;
  text-align: center;
  background-color: rgba(12, 10, 26, 0.8) !important;
  p {
    color: white;
  }
  h1 {
    color: white;
  }
  h2 {
    color: white;
  }
}
.cross-button {
    position: absolute;
    width: 20px;
    height: 20px;
    left: 0;
    text-align: left;
    bottom: 0;
    margin:5%;
    margin-left: 3.4%;
    margin-bottom: 5%;
    opacity: 0.25;
    img {
      cursor: pointer;
      width: 20px;
      height: 20px;
    }
}
</style>
