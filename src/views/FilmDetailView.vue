<template>
  <div>
    <FilmDetail :id = 'id'/>
  </div>
</template>

<script>
  import FilmDetail from "@/components/FilmDetail.vue"
  export default {
    name: 'filmdetailview',
    //id receieved from router
    props: {
      id: String,
    },
    components:{
      FilmDetail
    }
  }

</script>
