<script>
export default {
  name: 'action-elements-layer-mixin',
  data () {
    return {
      show_second_layer_buttons: false,
      show_rate_layer_buttons: true,
    }
  },
  methods: {
    onClickInfoButton: function() {
      this.layercounter ++
      if (this.layercounter === this.layers.length) {
        this.layercounter = 0
        this.show_rate_layer_buttons = true
        this.show_second_layer_buttons = false
      } else {
        this.show_rate_layer_buttons = false
        this.show_second_layer_buttons = true
      }
      this.currentLayer = this.layers[this.layercounter]
      this.currentSection = null


    },
    onClickLikeButton: function() {
      this.currentSection = 'LikeSectionThreeChoices'
    },
    onClickDislikeButton: function() {
      this.currentSection = 'DislikeSectionTwoChoices'
    },
    onClickRateSettingsButton: function() {
      this.currentLayer = 'SettingsModal'
      this.layercounter = 0
    },
  }
}
</script>
