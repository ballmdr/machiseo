<template>
  <v-card dark class="episode">
    <v-img :src="baseUrl + ep.field_thumbnail.uri.url"></v-img>
    <div class="number"><nuxt-link style="color: black !important" :to="ep.path.alias">ตอนที่ {{ ep.title }}</nuxt-link></div>
  </v-card>
</template>

<script>
export default {
  props: ['ep'],
  data () {
    return {
      baseUrl: process.env.baseUrl
    }
  } ,
  mounted() {
    //console.log(this.ep)
  }
}
</script>
<style scoped>
.episode .number {
  position: absolute;
  bottom: 0;
  right: 0;
  background: orange;
  padding: 5px 10px;
  color: black;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
}
</style>
