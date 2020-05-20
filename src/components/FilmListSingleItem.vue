<template>

  <li>
    <router-link :to="{ name: 'filmdetail', params: { id:film.id }}">{{film.id}}</router-link>
    <p>====| {{film.id}} || {{film.year}} |====</p>
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
