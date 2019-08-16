<template>
  <v-layout row wrap>
    <v-flex class="hvr-grow" xs6 sm4 v-for="ep in episodes" :key="ep.id"
      style="cursor:pointer"
    >
      <nuxt-link :to="getEpPath(ep.title)"><episode-card :ep="ep"></episode-card></nuxt-link>
    </v-flex>
  </v-layout>
</template>

<script>
// import { getEpisodesBySerie } from '~/assets/js/api'
import EpisodeCard from '~/components/episodes/EpisodeCard'


export default {
  props: ['episodes'],
  components: { EpisodeCard },
  data () {
    return {
      loading: true,
      currentEp: 0
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

