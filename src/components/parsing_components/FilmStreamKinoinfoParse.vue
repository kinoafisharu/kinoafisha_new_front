<template>
  <div>
    <v-card
        class="mx-auto"
        max-width="650"

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
                    <v-btn @click = 'onStreamUpdRelease' >Потоковое обновление дат релизов</v-btn>
                    {{textdata}}
                    <slot></slot>
                </v-card-text>
              </v-window-item>
            </v-window>
      </v-card>
    </div>
</template>

<script>
import service from '@/api/base.js'
export default {
  name: 'filmstreamkinoinfoparse',
  data() {
    return {
      currentTitle: 'Парсинг релизов',
      obj: null,
      text: null,
    }
  },
  mounted() {
    this.getLogs()
    if (this.obj) {
      setInterval(this.getLogs(), 3000)
    }
  },
  methods: {
    onStreamUpdRelease: function() {
      service.post('parsing/parsefilmsstream/', {
        start: 'true'
      })
      .then(res => {
        console.log(res);
        this.obj = res.data
      })
    },
    getLogs: function() {
      service.get('/parsing/parsefilmsstream/')
      .then(res => {
        console.log(res);
        this.text = res.data
      })
    },
  },
  computed: {
    textdata: function() {
      if (this.text) {
        let txt = this.text.data
        return String(txt)
      } else {
        return null
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
