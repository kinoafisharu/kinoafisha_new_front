<template>
  <div id = 'form'>
    <input id = 'inp' v-model="imdb" placeholder="IMDB ID">
    <button v-if = '!loaded' @click = 'onForm' :value = 'imdb'>Подтвердить</button>
    <button v-else-if = '!updated'  @click = 'onFormSub' :value = 'imdb'>Подтвердить обновление</button>
    <button v-else  @click = 'refresh'> Повторить </button>
    <p v-if = 'updated'> SUCESS!! </p>
  <div class = 'params' v-if = '!updated'>
  <p v-if = 'obj'>Нужный фильм?:  {{obj[1].title.name}}</p>
  <p v-if = 'obj'> ID IMDB:  {{obj[0].imdb_id}}</p>
  <p v-if = 'obj'> Голоса: {{obj[0].imdb_votes}}</p>
  <p v-if = 'obj'> Рейтинг: {{obj[0].imdb_rate}}</p>
  </div>
  <div v-else class = 'params'>
    <p> Обновлен один фильм {{obj.fobj}} ( -= id в базе в скобках) с названием {{obj.tobj}}</p>
  </div>

</div>
</template>
<script>
import service from '@/api/base.js'
export default {
  name: 'parseform',
  data() {
    return {
      imdb: null,
      obj: null,
      updated: false,
      loaded: false,
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
        this.obj = res.data
        this.loaded = true
      })
    },
    onFormSub: function() {
      service.post('parsing/parsefilms/', {
        imdb_id: this.imdb,
        submit: 'true',
      })
      .then(res => {
        console.log(res);
        this.obj = res.data
        this.updated = true
        this.imdb = null
      })
    },
    refresh() {
      this.updated = false
      this.loaded = false
      this.obj = null
    }
  }
}
</script>
<style scoped lang='scss'>
  #form {
    margin-top: 15%;
  }
  #inp {
    padding: 1%;
    border: 1px solid white;
  }
  .params {
    margin-top: 2%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
</style>
