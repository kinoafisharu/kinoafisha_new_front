<template>
  <div>
    <v-card
        class="mx-auto"
        max-width="500"
      >
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>{{currentTitle}}</span>
          <v-avatar
            color="primary lighten-2"
            class="subheading white--text"
            size="24"
            v-text="step"
          ></v-avatar>
        </v-card-title>
        <v-window v-model="step">
            <v-window-item :value="1">
              <v-card-text>
                <v-text-field
                  v-model = 'imdb'
                  label="IMDB ID"
                ></v-text-field>
                <v-btn v-if = '!loaded' @click = 'onForm' :value = 'imdb'>Подтвердить</v-btn>
                <v-btn v-else-if = '!updated'  @click = 'onFormSub' :value = 'imdb'>Подтвердить обновление</v-btn>
                <v-btn v-else  @click = 'refresh'> Повторить </v-btn>
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
                <slot></slot>
              </v-card-text>
            </v-window-item>
          </v-window>
    </v-card>
</div>
</template>

<script>
import service from "@/api/base.js"
export default {
  name: 'filmdotimdbparse',
  data() {
    return {
      currentTitle: 'Введите ID IMDB',
      imdb: null,
      updated: false,
      loaded: false,
      obj: null,
    }
  },
  methods: {
    refresh() {
        this.loaded = false
        this.updated = false
        this.obj = null
        this.imdb = null
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
  }
}
</script>

<style scoped lang='scss'>
</style>
