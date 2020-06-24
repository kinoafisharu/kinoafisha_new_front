

<script>
// Миксин для управления слоями
// chooseLayer принимает числовое значение и меняет значение текущего слоя на
// слой с позицией в списке слоев равной этому значению
// FlushLayers сбрасывает счетчик переключений слоев и ставит текущий слой на null (главное окно)
export default {
  data() {
    return {
      layers: [null, 'InfoLayer', 'ThirdLayer'],
      layercounter: 0,
      currentLayer: null,
    }
  },
  methods: {
    chooseLayer: function(val) {
      this.currentLayer = this.layers[val]
    },
    flushLayers: function() {
      this.layercounter = 0
      this.currentLayer = null
    },
    closeLayer: function() {
      this.flushSections()
      this.flushLayers()
      this.selectRateButtons()
    },
  },
}
</script>
