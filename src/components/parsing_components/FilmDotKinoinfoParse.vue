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
                  v-model = 'kid'
                  label="KID"
                ></v-text-field>
                  <v-btn v-if = '!obj' @click = 'onKidSub' :value = 'kid'>Подтвердить</v-btn>
                  <div v-if = 'obj'>
                    <h2>Нужный постер?</h2>
                    <v-img :src = 'obj.poster'/>
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
  name: 'filmdotkinoinfoparse',
  data() {
    return {
      obj: null,
      kid: null,
      currentTitle: 'Введите Kinoinfo ID'
    }
  },
  watch: {
    kid() {
      this.obj = null
    }
  },
  methods: {
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
  }
}
</script>

<style scoped lang='scss'>
</style>
