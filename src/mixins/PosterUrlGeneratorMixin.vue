<script>
// Миксин для генерации url постера
export default {
  methods: {
    imgsrc: function() {
      if (this.kid) {
        let kid = this.kid
        let thousand = Math.trunc(Number(kid) / 1000) + 1 // какая тысяча. используется в URL.
        let url = "http://posters.kinoafisha.ru/" + thousand + "/" + String(kid) + "-001.jpg"
        console.log(url)
        return url
      } else {
        return null
      }
    },
  }
}
</script>
