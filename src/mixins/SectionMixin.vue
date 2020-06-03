
<script>
export default {
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
