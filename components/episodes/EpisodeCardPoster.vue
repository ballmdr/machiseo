<template>
  <nuxt-link :to="getEpPath(ep.field_series_episode.path.alias, ep.title)">
    <v-card dark flat style="cursor:pointer;margin:10px;">
      <v-img :src="baseUrl + ep.field_thumbnail.uri.url" max-height="200"></v-img>
      <v-card-title class="poster-above" style="height:100px;">
        <v-img class="poster" :src="baseUrl + ep.field_series_episode.field_poster[0].uri.url" max-height="100"></v-img>
        <span style="position:absolute;font-weight:bold;margin-top:33px;margin-left:90px;"><div>{{ ep.field_series_episode.title }}</div> ตอนที่ {{ ep.title }}</span>
      </v-card-title>
    </v-card>
  </nuxt-link>
</template>

<script>

export default {
  props: ['ep'],
  data () {
    return {
      baseUrl: process.env.baseUrl,
      epDialog: false
    }
  },
  methods: {
    getEpPath (serie_path, ep_title) {
      const link = serie_path
      const path = link.split('/')
      return '/' + path[2] + '/' + ep_title
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
  min-width: 50px;
}
.poster-above .heading {
  margin-top: 50px;
  margin-left: 1em;
  overflow: hidden;
  max-width: 150px;
}
</style>
