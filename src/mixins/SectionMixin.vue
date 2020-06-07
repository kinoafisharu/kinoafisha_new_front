
<script>
// Миксин для переключения секций кнопок, действует как LayerMixin
export default {
  data() {
    return {
      currentSection: null,
    }
  },
  methods: {
    flushSections: function() {
      this.currentSection = null
    },
    chooseSection: function(val) {
      this.currentSection = val
    },
  }
}
</script>
