<template>
  <div class="Film">
    <Poster :id="id"></Poster>
  </div>
</template>

<script>
import Poster from "../components/Poster/Poster";

export default {
  name: "Film",
  props: ["id"],
  components: { Poster }
};
</script>

<style scoped lang="scss">
@media (orientation: portrait) {
  .Film {
    flex-direction: column;
  }
}
@media (orientation: landscape) {
  .Film {
    flex-direction: row;
  }
}
.Film {
  display: flex;
  height: 100%;
  width: 100%;
}
</style>
