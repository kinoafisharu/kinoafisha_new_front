<template>
  <div class = 'filminfo'>
    <h1 v-if = 'title' id = 'title'>{{title}}</h1>
    <h1 v-else> Без названия </h1>
        <div v-for = 'country in country' :key = 'country.name'>
          <p id = 'description'>{{country.name}}, {{year}}</p>
        </div>
    <div class = 'genre-block'>
      <p id = 'description' v-if = 'genre[0]'>{{genre[0].name}} '/'
      <p id = 'description' v-if = 'genre[1]'>{{genre[1].name}} '/'
      <p id = 'description' v-if = 'genre[2]'>{{genre[2].name}} </p>
    </div>
        
    <p v-if = 'description' id = 'description'>{{description}}</p>
    <p v-else id = 'description'> Аннотации пока нет. </p>
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
  .genre-block {
    display: inline;
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
