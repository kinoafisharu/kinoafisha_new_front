<template>
  <div class = 'title-block-0'>
    <h1>{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: 'title-block',
  props: {
    title: String,
  }
}
</script>

<style>
 .title-block-0 {
   position: absolute;
 }
</style>
