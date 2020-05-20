<template>

  <li>
    <p>{{film.id}}</p>
    <p>{{film.imdb_id}}</p>
    <router-link :to="{ name: 'filmdetail', params: { id:film.id }}">See it here</router-link>
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
