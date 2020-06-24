<template>
  <!-- Главный блок -->
  <div class = 'infolayer'>

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
      <p class = 'country-name' v-for = 'count in country'
          :key = 'count.name'>

         {{count.name}}
      </p>
    </div>

    <!-- Блок описания -->
    <div class = 'description-block'>
      <p v-if = 'description && !tohtml' id = 'description'>{{description}}</p>
      <div class = 'htmldescription' v-else-if = 'tohtml' v-html = 'description'></div>
      <p v-else id = 'description'>This films doesn't have description yet, you can propose your version of description for this film by clicking the button below </p>
      <p v-if = 'votes'>{{votes}}</p>
    </div>

    <CrossButton class='cross-button' @click.native = 'close'/>


  </div>

</template>


<script>
// Слой информации принимает описанные пропсы и булевы пропсы: tohtml => Преобразовать html строку в код (true/false)
import CrossButton from "@/components/global/buttons/CrossButton"
  export default {
    name: 'infolayer',
    components: {
      CrossButton
    },
    props: {
      tohtml: Boolean,
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
        show_settings_section: false,
      }
    },
    methods: {
      close: function() {
        this.$emit('close')
      }
    }
  }
</script>


<style scoped lang = 'scss'>




  .infolayer {
    width: inherit;
    height: 91%;
    clear: both;
    overflow-y: auto;
    position: absolute;
    z-index: 2;
    top: 0;
    bottom:0;
    text-align: center;
    background-color: rgba(12, 10, 26, 0.8) !important;
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

  .cross-button {
    position: absolute;
    width: 20px;
    height: 20px;
    right: 0;
    text-align: left;
    top: 0;
    margin: 5%;
    margin-bottom: 5%;
    margin-left: 5%;
    margin-left: 3.4%;
    margin-bottom: 5%;
    opacity: 0.25;
    cursor: pointer;
  }
.htmldescription {
  color: white;
  font-size-adjust: auto;
  padding: 2%;
}

.country-name {
}


</style>
