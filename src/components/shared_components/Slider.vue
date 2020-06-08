<template>
  <SliderWrapper>
    <BottomBlock>
    </BottomBlock>
  </SliderWrapper>
</template>

<script>
import SliderWrapper from '@/components/global/wrappers/SliderWrapper'
import BottomBlock from '@/components/global/blocks/BottomBlock'
export default {
  name: 'slider',
  components: {
    SliderWrapper,
    BottomBlock,
  }
}
</script>

<style lang = 'scss'>
.bottom-block {
  background-color: black;
  opacity: 0.5;
  height: 10%;
  width: 100%;

  position: absolute;
}
.slider-wrapper {
  width: 1000px;
  height: 500px;
}
</style>
