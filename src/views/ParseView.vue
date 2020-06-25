<template v-if = 'obj'>
  <div id = 'wrapper'>
  <div id = 'form' v-if = "!kidd">
    <input v-if = '!updated' id = 'inp' v-model="imdb" placeholder="IMDB ID">
    <button v-if = '!loaded' @click = 'onForm' :value = 'imdb'>Подтвердить</button>
    <button v-else-if = '!updated'  @click = 'onFormSub' :value = 'imdb'>Подтвердить обновление</button>
    <button v-else  @click = 'refresh'> Повторить </button>
    <button @click = 'change'> Переключиться на {{kidd ? 'imdb' : 'kinoinfo'}} </button>
    <p v-if = 'updated'> SUCESS!! </p>
  <div class = 'params' v-if = '!updated'>
  <p v-if = 'obj'>Нужный фильм?:  {{obj.name[0].name}}</p>
  <p v-if = 'obj'> ID IMDB:  {{obj.imdb_id}}</p>
  <p v-if = 'obj'> Голоса: {{obj.imdb_votes}}</p>
  <p v-if = 'obj'> Рейтинг: {{obj.imdb_rate}}</p>
  </div>
  <div v-else class = 'params'>
    <p> Обновлен один фильм {{obj[1].fobj}} ( -= id в базе в скобках) с названием {{obj[0].name.name}}</p>
  </div>
  </div>
  <div id = 'form' v-if = 'kidd'>
    <input id = 'inp' v-model="kid" placeholder="KID">
    <button @click = 'onKidSub' :value = 'kid'>Подтвердить</button>
    <button @click = 'change'> Переключиться на {{kidd ? 'imdb' : 'kinoinfo'}} </button>
    <div v-if = 'obj'>
      <h2>Нужный постер?</h2>
      <img id = 'posterimg' :src = 'obj.poster'>
    </div>
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
      kid: null,
      kidd: false,
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
    change() {
      this.kidd = !this.kidd
      this.obj = null
      this.loaded = false
      this.updated = false
    },
    onForm: function() {
      service.post('parsing/parsefilms/', {
        imdb_id: this.imdb,
        id_type: 'imdb',
      })
      .then(res => {
        console.log(res);
        this.obj = res.data
        this.loaded = true
      })
    },
    onFormSub: function() {
      service.post('parsing/parsefilms/', {
        imdb_id: this.imdb,
        id_type: 'imdb',
        submit: 'true',
      })
      .then(res => {
        console.log(res);
        this.obj = res.data
        this.updated = true
        this.imdb = null
      })
    },
    onKidSub: function() {
      service.post('parsing/parsefilms/', {
        kid: this.kid,
        id_type: 'kinoinfo',
      })
      .then(res => {
        console.log(res);
        this.obj = res.data
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 15%;
  }
  #inp {
    margin: 0 auto;
    margin-right: 2%;
    padding: 1%;
    border: 1px solid white;
  }
  #posterimg {
    max-width: 100%;
    max-height: 100%;
  }
  .params {
    margin-top: 2%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  #wrapper {
    display: flex;
    justify-content: center;
  }
</style>
