<template>
  <div>
    <v-card
        class="mx-auto"
        max-width="800"

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
                    <v-row>
                      <v-col class="d-flex" cols="12" sm="5">
                        <v-select
                          :items="time_items"
                          v-model = 'timecut_value'
                          label="Solo field"
                          solo
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          label="Solo"
                          placeholder = 'От'
                          v-model = 'year_from'
                          solo
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          label="Solo"
                          placeholder = 'До'
                          v-model = 'year_to'
                          solo
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-btn v-if = 'items.length == 0' @click = 'getParsedItems'>Подтвердить</v-btn>
                    <v-btn v-else @click = 'submitSelected'>Запись в бд</v-btn>
                    <v-list shaped>
                     <v-list-item-group
                       multiple
                       v-model = 'items'
                     >
                       <template v-for="item in items">

                         <v-list-item
                           :key="item"
                           :value = "item"
                           >
                           <template v-slot:default = "{ active, toggle }">
                             <v-list-item-content>
                               <v-list-item-title v-text="item"></v-list-item-title>
                             </v-list-item-content>

                             <v-list-item-action>
                               <v-checkbox
                                 :input-value="active"
                                 :true-value="items"
                                 color="deep-purple accent-4"
                                 @click="toggle"
                               ></v-checkbox>
                             </v-list-item-action>
                           </template>
                         </v-list-item>
                       </template>
                     </v-list-item-group>
                   </v-list>
                    <slot></slot>
                </v-card-text>
              </v-window-item>
            </v-window>
      </v-card>
    </div>
</template>

<script>
export default {
  name: 'filmstreamkinoinfoparse',
  data() {
    return {
      currentTitle: 'Парсинг релизов',
      time_items: [
        {
           text: 'По годам релизов',
           value: 'release'
        },
        {
          text: 'По годам выпуска',
          value: 'year'
        },
      ],
      timecut_value: 'year',
      socket: null,
      year_from: null,
      year_to: null,
      items: [],
      selected_items: this.items,
      settings: [],
    }
  },
  watch: {
    items(val) {
      console.log(val);
    }
  },
  created() {
      this.socket = new WebSocket('ws://new-new-api.herokuapp.com/ws/parse')

      this.socket.onmessage = (e) => {
          let data = JSON.parse(e.data);
          this.items.push({
            data
          })
        };

      this.socket.onclose = (e) => {
          console.log(e);
          console.error('Chat socket closed unexpectedly');
        };
  },
  methods: {
    getParsedItems: function() {
      this.socket.send(JSON.stringify({
        action: 'start',
        year_from: this.year_from,
        year_to: this.year_to,
        timecut_by: this.timecut_value,
      }))
    },
    submitSelected: function() {
      this.socket.send(JSON.stringify({
        action: 'submit',
        data: this.items,
      }))
      this.items = []
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
</style>
