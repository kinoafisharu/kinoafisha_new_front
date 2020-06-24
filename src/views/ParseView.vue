<template>
  <div id = 'form'>
    <input v-model="imdb" placeholder="IMDB ID">
    <button @click = 'onForm' :value = 'imdb'>Submit</button>
  <p v-if = 'film'>Нужный фильм?:  {{film}}</p>
</div>
</template>
<script>
import service from '@/api/base.js'
export default {
  name: 'parseform',
  data() {
    return {
      imdb: null,
      film: null,
    }
  },
  watch: {
    imdb(val) {
      console.log(val);
    }
  },
  methods: {
    onForm: function() {
      service.post('parsing/parsefilms/', {imdb_id: this.imdb})
      .then(res => {
        console.log(res);
        this.film = res.data.name
      })
    }
  }
}
</script>
<style scoped lang='scss'>
  #form {
    margin-top: 15%;
  }
</style>
