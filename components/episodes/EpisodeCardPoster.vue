<template>
  <v-card dark flat style="cursor:pointer" @click="$router.push('/episodes')">
    <v-img :src="baseUrl + ep.field_thumbnail.url"></v-img>
    <v-card-title class="poster-above">
      <v-img class="poster" :src="baseUrl + ep.field_series_episode.field_poster[0].url"></v-img>
      <div class="heading"><h3>{{ ep.field_series_episode.title }}</h3> ตอนที่ <span class="subheading">{{ ep.title }}</span></div>
    </v-card-title>
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
.poster-above {
  z-index: 1;
  margin-top: -70px;
 
}
.poster-above .poster {
  border-radius: 10px;
  box-shadow: 0 13px 26px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.2);
  max-width: 70px;
  min-width:30px;
}
.poster-above .heading {
  margin-top: 50px;
  margin-left: 1em;
  overflow: hidden;
  max-width: 150px;
}
</style>
