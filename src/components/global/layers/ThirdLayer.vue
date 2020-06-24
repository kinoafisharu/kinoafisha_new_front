<template>
  <div class = 'modal'>
    <h1>
      Приветствую, дорогой друг!
    </h1>
    <p>
      Ты видишь этот постер, и это приятно!
      Мы хотим, чтобы ты стал нашим постоянным пользователем.
      Мы - это команда IKar Studio: Михаил Иванов и Александр Караваев.
      Если тебе понравится наша затея и ты решишь помочь проекту или принять участие
      в работе над ним, пиши в вотсап +7(925)6268300
    </p>
    <hr>
    (Здесь будет окно знакомства, раньше это называлось авторизация)

    <CrossButton class='cross-button' @click.native = 'close'/>

  </div>
</template>

<script>
// Третий слой, пока не определен
import CrossButton from "@/components/global/buttons/CrossButton"
export default {
  name: 'thirdlayer',
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
  top: 0;
  bottom:0;
  color: white;
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
