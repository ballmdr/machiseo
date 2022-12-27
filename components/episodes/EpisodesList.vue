<template>
  <div>
    <v-card v-for="ep in episodes" :key="ep.id"
      style="cursor:pointer; margin:15px;"
    >
      <nuxt-link :to="getEpPath(ep.title)">
        <div class="episode">
          <v-img :src="baseUrl + ep.field_thumbnail.uri.url" style="max-height:130px"></v-img>
          <div class="number">ตอนที่ {{ ep.title }}</div>
        </div>
      </nuxt-link>
    </v-card>
  </div>
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
