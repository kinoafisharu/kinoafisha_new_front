<template>

  <li>
    <router-link :to="{ name: 'filmdetail', params: { id:film.id }}">{{film.id}}</router-link>
    <p>====| {{film.year}} |====</p>
    <a href="https://www.imdb.com/title/tt{{film.imdb_id}}>Go to imdb</a>
    <a href=http://kinoinfo.ru/film/{{film.kid}}>Go to kinoinfo</a>
    <hr>
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
