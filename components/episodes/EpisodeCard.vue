<template>
  <v-card dark>
    <v-img :src="baseUrl + ep.field_thumbnail.url"></v-img>
    <v-card-title class="poster-above">
      <v-img class="poster" :src="baseUrl + ep.field_series_episode.field_poster[0].url"></v-img>
      <h2>{{ ep.field_series_episode.title }}</h2>
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
