<template>
  <!-- Домашняя страница -->
  <v-container>
    <v-row>
      <v-col>
        <MediumMenuCard mtitle = 'Киноафиша'
                        subtitle = 'Подзаголовок'
                        src = 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'>
          <template v-slot:actions>
            <div>
            <v-btn
                to = '/kinoafisha'
                color="orange"
                text
              >
                Перейти
              </v-btn>

              <v-btn
                color="orange"
                text
              >
                Настройки
            </v-btn>
          </div>
          </template>
          <template v-slot:text>
            <div>В данном блоке будет информация о киноафише</div>
          </template>
        </MediumMenuCard>
      </v-col>
      <v-col>
        <MediumMenuCard mtitle = 'Истории'
                        subtitle = 'Подзаголовок'
                        src = 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'>
          <template v-slot:actions>
            <div>
            <v-btn
                to = '/stories'
                color="orange"
                text
              >
                Перейти
              </v-btn>

              <v-btn
                color="orange"
                text
              >
                Настройки
            </v-btn>
          </div>
          </template>
          <template v-slot:text>
            <div>В данном блоке будет информация о историях</div>
          </template>
        </MediumMenuCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MediumMenuCard from '@/components/global/cards/MediumMenuCard'
// Домашняя страница
export default {
    name: "home",
    components: {
      MediumMenuCard,
    }
}
</script>

<style scopd lang ='scss'>
.home {
  width: 200px;
  height: 100px;
  padding-top: 50px;
  position: flex;
  text-align: center;

}
</style>
