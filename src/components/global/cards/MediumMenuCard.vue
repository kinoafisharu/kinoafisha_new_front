<template>
<v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="src"
    >
      <v-card-title>{{mtitle}}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">{{subtitle}}</v-card-subtitle>

    <v-card-text class="text--primary">
      <slot name="text"></slot>
    </v-card-text>

    <v-card-actions>
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'menu-medium-card',
  props: {
    mtitle: String,
    subtitle: String,
    src: String,
  }
}
</script>
