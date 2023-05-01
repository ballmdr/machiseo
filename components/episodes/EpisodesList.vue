<template>
  <v-layout row wrap>
    <v-flex class="hvr-grow" xs6 sm4 v-for="ep in episodes" :key="ep.id"
      style="cursor:pointer"
    >
      <nuxt-link :to="getEpPath(ep.title)">
        <v-card dark class="episode">
          <v-img :src="baseUrl + ep.field_thumbnail.uri.url"></v-img>
          <div class="number">ตอนที่ {{ ep.title }}</div>
        </v-card>
      </nuxt-link>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  props: ['episodes'],
  data () {
    return {
      baseUrl: process.env.baseUrl
    }
  },
  methods: {
    getEpPath (url) {
      console.log(this.episodes)
      const link = this.$store.state.series.serie.path.alias
      const path = link.split('/')
      return '/' + path[2] + '/' + url
    }
  }
}
</script>

<style scoped>
.episode .number {
  position: absolute;
  bottom: 0;
  right:0;
  background: orange;
  padding: 5px 10px;
  color: black;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
}
</style>
