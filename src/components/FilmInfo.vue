<template>
  <!-- Главный блок -->
  <div class = 'filminfo'>

    <!-- Блок заголовков -->
    <div class = 'title-block'>
      <h1 v-if = 'title' id = 'title'>{{title}}</h1>
      <h1 v-else> This film doesnt have a title yet </h1>
      <h2 v-if = 'year' id = 'year'>{{year}}</h2>
    </div>

    <!-- Блок с жанрами, отображается с помощью цикла for -->
    <div class = 'genre-block'>
      <p v-for = 'gen in genre'
          :key = 'gen.name'>

      | {{gen.name}} |
      </p>
    </div>

    <!-- Блок со странами, цикл for -->
    <div>
      <p v-for = 'count in country'
          :key = 'count.name'>

          {{count.name}}, {{count.name_en}}
      </p>
    </div>

    <!-- Блок описания -->
    <div class = 'description-block'>
      <p v-if = 'description' id = 'description'>{{description}}</p>
      <p v-else id = 'description'>This films doesn't have description yet, you can propose your version of description for this film by clicking the button below </p>
      <p v-if = 'votes'>{{votes}}</p>
    </div>

      <div class = "modal-layer-settings-button">
        SETTINGS
      </div>
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
    },
    data() {
      return {
        show_settings: false,
      }
    },
    methods: {
      onSettingsClick: function() {
        this.show_settings = !this.show_settings
      }
    }
  }
</script>


<style scoped lang = 'scss'>
  .filminfo {
    width: inherit;
    height: inherit;
    position: relative;
    left: 0px;
    top: 0px;
    z-index: 2;
    text-align: center;
    p {
      color: white;
    }
    h1 {
      color: white;
    }
    h2 {
      color: white;
    }

  }
  .genre-block {
    text-align: center;
    p {
      display: inline;
    }
  }
  .modal-layer-settings-button {
    cursor: pointer;
    position: relative;
    width: 100%;
    text-align: center;
    z-index: 3;
    color: white;
    background-color: rgba(10, 9, 20, 0.5);
  }


</style>
