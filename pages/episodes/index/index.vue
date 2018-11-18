<template>
  <v-layout row wrap>
    <v-flex class="hvr-grow" xs12 sm4 md3 v-for="(episode, index) in episodes" :key="episode.id" @click="showEp(index)">
      <episode-card-poster :ep="episode"></episode-card-poster>
    </v-flex>
    <v-dialog :fullscreen="$vuetify.breakpoint.xsOnly" v-model="epDialog" transition="dialog-bottom-transition" scrollable max-width="900px">
      <episode-show-one :ep="ep" :imgStreaming="imgStreaming" @closeDialog="epDialog = false"></episode-show-one>
    </v-dialog>
  </v-layout>
</template>

<script>
import { getAllEpisodes, getImgStreamingByUuid } from '~/assets/js/api'
import EpisodeCardPoster from '~/components/episodes/EpisodeCardPoster'
import EpisodeShowOne from '~/components/episodes/EpisodeShowOne'

export default {
  components: { EpisodeCardPoster, EpisodeShowOne },
  data () {
    return {
      epDialog: false,
      imgStreaming: null
    }
  },
  mounted() {
    console.log('ep', this.episodes)
  },
  methods: {
    async showEp(index) {
      this.epDialog = true
      this.ep = this.episodes[index]
      const res = await getImgStreamingByUuid(this.ep.uuid)
      this.imgStreaming = res.field_img_streaming
    }
  },
  async asyncData () {
    const episodes = await getAllEpisodes()
    const ep = episodes[0]
    return { episodes, ep }
  }
}
</script>
