

<script>
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
