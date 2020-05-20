<template>
  <div>
    <FilmDetail :id = 'id'/>
  </div>
</template>

<script>
  import FilmDetail from "@/components/FilmDetail.vue"
  export default {
    name: 'filmdetailview',
    props: ['id'],
    components:{
      FilmDetail
    }
  }

</script>
