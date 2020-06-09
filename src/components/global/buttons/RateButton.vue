<template>
  <div class='rate' :class="'rate_color_'+ ratecalced" title = 'Show settings'>
    <!-- Отображение рейтинга если такой есть -->
    <a class='blue-gray--text'>{{ratecalced}}</a>
  </div>
</template>

<script>
// Кнопка/блок рейтинга появляется слева, меняет цвет в зависимости от рейтинга от 1 до 5
export default {
  name: 'rate-button',
  props: {
    ratecalced: [String, Number],
  }
}
</script>

<style lang='scss'>
.rate {
    cursor: pointer;
    display: flex;
    border-top-right-radius: 38%;
    border-bottom-right-radius: 38%;
    padding-left: 4%;
    padding-right: 7%;
    color: black !important;
    align-self: flex-start;
    margin-top: 14%;
    font-size: 4em;
    padding: 2%;
    color: black;
    font-weight: bold;
}
.rate_color_0 {
    background: rgba(255, 250, 250, 0.8);
    color: #333;
}
.rate_color_2 {
    background: rgba(94, 2, 2, 0.8) !important;
    color: #5C124A;
}
.rate_color_3 {
    background: rgba(255, 218, 185, 0.8) !important;
    color: #4C2E0F;
}
.rate_color_4 {
    background: rgba(126, 192, 238, 0.8) !important;
    color: #002E4C;
}
.rate_color_5 {
    background: rgba(60, 179, 113, 0.8) !important;
    color: #002E00;
    color: black;
}
</style>
