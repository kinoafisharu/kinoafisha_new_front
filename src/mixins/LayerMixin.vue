

<script>
// Миксин для управления слоями
// chooseLayer принимает числовое значение и меняет значение текущего слоя на
// слой с позицией в списке слоев равной этому значению
// FlushLayers сбрасывает счетчик переключений слоев и ставит текущий слой на null (главное окно)
export default {
  methods: {
    chooseLayer: function(val) {
      this.currentLayer = this.layers[val]
    },
    flushLayers: function() {
      this.layercounter = 0
      this.currentLayer = null
    },
  },
}
</script>
