<template>
  <!-- Оверлей с пагинацией, может исопльзоваться для отображения различной информации -->
  <v-overlay z-index = 10 opacity = 0.80>
    <v-row justify = 'center'>
    <v-col sm='6'>
    <v-window
    ref = 'window'
    v-model="window"
    class="elevation-2"
    showArrows = true
    >
    <v-window-item
    v-for="n in getTextItems"
    :key="n"
    >
      <v-card flat>
        <v-card-text>
          <v-row class="mb-4" align="center">
            <v-avatar color="grey" class="mr-4"></v-avatar>
            <strong class="title">{{title}}</strong>
            <v-spacer></v-spacer>
          </v-row>

          <p style = 'font-size: 1.25em;'>{{n}}</p>

        </v-card-text>
      </v-card>
    </v-window-item>
  </v-window>
</v-col>
</v-row>
<v-btn
  icon
  @click="close"
>
  <v-icon>mdi-close</v-icon>
</v-btn>
</v-overlay>
</template>
<script>
import { bus } from '@/bus/bus.js'
  export default {
    name: 'info-overlay',
    props: {
      title: String,
      text: String,
    },
    data() {
      return {
        txtObj: this.text,
      }
    },
    computed: {
      // Деление текста по регулярному выражению
      getTextItems: function() {
        let object = this.txtObj
        if (object.length >= 358) {
        return object.match(new RegExp('.{1,' + Math.floor(object.length / 2)  + '}', 'g'));
      } else {
        return [object]
      }
      }
    },
    methods: {
      // Вызывает событие overlay в глобальной шине
      close() {
        bus.$emit('overlay')
      }
    }
  }
</script>
