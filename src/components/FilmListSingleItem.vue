<template>

  <li>
    <router-link :to="{ name: 'filmdetail', params: { id:film.id }}">{{film.id}}</router-link>
    <p>====| {{film.year}} |====</p>
    <template v-if="film.imdb_id">
      <a :href="'https://www.imdb.com/title/tt' + film.imdb_id">Go to imdb</a>
    </template>
    <p> ----------------------------------------- </p>
    <template v-if ="film.kid">
      <a :href="'http://kinoinfo.ru/film/' + film.kid">Go to kinoinfo</a>
    </template>
    <p> ----------------------------------------- </p>
  </li>

</template>

<script>
  export default {
    components: {
    },
    props: {
      film: {
        type: Object,
        id: Number,
        imdb_id: String,
        kid: String,
        year: String,
        genres: Object,
        names: Object,
      }
    }
  }
</script>
