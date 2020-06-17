<template>
<!-- Враппер активных элементов, оборачивает активные елементы
и рендерит в себе сообщения об ошибках -->
  <div id="action-elements-layer">
    <div class = 'rate-alert'>
        <v-alert
              v-model = 'rateAlert'
              dismissible
              @click = 'this.rateAlert = false'
              close-icon="mdi-delete"
              color="secondary"
              elevation="0"
              colored-border
              icon="mdi-alert"
              >
              Вы уже голосовали!
        </v-alert>
      </div>
    <slot></slot>
  </div>
</template>

<script>
// Обертка слоя активных елементов, задает границы слоя равные картинке и каркас в виде флексбокса
export default {
  name: 'action-elements-layer',
  data() {
    return {
      rateAlert: false,
    }
  }

}
</script>

<style scoped lang='scss'>

#action-elements-layer {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
}
.rate-alert {
  position: absolute;
  right: 0;
  width: 100%;
  top: 80.1%;
  opacity: 0.8;
  z-index: 3;
}
</style>
