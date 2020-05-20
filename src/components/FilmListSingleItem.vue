<template>

  <li>
    <p>{{film.id}} {{film.year}}</p>
    <router-link :to="{ name: 'filmdetail', params: { id:film.id }}">{{film.imdb_id}}</router-link>
  </li>

</template>

<script>
  export default {
    components: {
    },
    props: {
      film: {
        type: Object,
        id: String,
        imdb_id: String,
      }
    }
  }
</script>
