<template>
  <LittleRoundButton class="cross-button" buttonimagesource = 'cross.png'/>
</template>

<script>
// Кнопка крестика, обычно используется для закрытия чего либо
import LittleRoundButton from "@/components/global/buttons/LittleRoundButton"
export default {
  name: 'crossbutton',
  components: {
    LittleRoundButton,
  }
}
</script>

<style scoped lang='scss'>
  .cross-button {
    ::v-deep img {
      width: 100%;
      height: 100%;
    }
  }
</style>
