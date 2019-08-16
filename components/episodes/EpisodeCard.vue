<template>
  <v-card dark class="episode">
    <v-img :src="baseUrl + ep.field_thumbnail.url"></v-img>
    <div class="number">ตอนที่ {{ ep.title }}</div>
  </v-card>
</template>

<script>
export default {
  props: ['ep'],
  data () {
    return {
      baseUrl: process.env.baseUrl
    }
  }
}
</script>
<style scoped>
.episode .number {
  position: absolute;
  bottom: 0;
  left: 0;
  background: orange;
  padding: 5px 10px;
  color: black;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
}
</style>