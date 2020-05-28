<template>
  <div class = 'filminfo'>
    <h1 v-if = 'title' id = 'title'>{{title}}</h1>
    <h1 v-else> This film doesnt have a title yet </h1>
        <div v-for = 'country in country' :key = 'country'>
          <p id = 'description'>{{country.name}}, {{country.name_en}}</p>
        </div>
        <div v-for = 'genre in genre' :key = 'genre'>
          <p id = 'description'>{{genre.name}}, {{genre.name_en}}</p>
        </div>
    <h2 v-if = 'year' id = 'year'>{{year}}</h2>
    <p v-if = 'description' id = 'description'>{{description}}</p>
    <p v-else id = 'description'>This films doesn't have description yet, you can propose your version of description for this film by clicking the button below </p>
  </div>
</template>


<script>
  export default {
    name: 'filminfo',
    props: {
      description: String,
      title: String,
      comment: String,
      persons: Array,
      budget: String,
      year: Number,
      country: Array,
      votes: Number,
      release: Array,
      genre: Array,
    }
  }
</script>


<style>
  .filminfo {
    width: inherit;
    height: inherit;
    position: relative;
    left: 0px;
    top: 0px;
    z-index: 2;
    text-align: center;
  }
  #title {
    color: white;
  }
  #description {
    color: white;
  }
  #votes {
    color: white;
  }
  #year {
    color: white;
  }
</style>
