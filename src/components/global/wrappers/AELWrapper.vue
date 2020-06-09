<template>
  <div id="action-elements-layer">
    <slot></slot>
  </div>
</template>

<script>
// Обертка слоя активных елементов, задает границы слоя равные картинке и каркас в виде флексбокса
export default {
  name: 'action-elements-layer',

}
</script>

<style lang='scss'>

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
</style>
