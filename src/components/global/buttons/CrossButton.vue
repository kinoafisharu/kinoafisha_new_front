<template>
  <LittleRoundButton buttonimagesource = 'cross.png'/>
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

</style>
