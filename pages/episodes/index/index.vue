<template>
  <v-layout row wrap>
    <v-flex class="hvr-grow" xs12 sm4 md3 v-for="episode in episodes" :key="episode.id">
      <episode-card-poster :ep="episode"></episode-card-poster>
    </v-flex>
  </v-layout>
</template>

<script>
import { getAllEpisodes } from '~/assets/js/api'
import EpisodeCardPoster from '~/components/episodes/EpisodeCardPoster'

export default {
  components: { EpisodeCardPoster },
  data () {
    return {
      epDialog: false
    }
  },
  mounted() {
    console.log('ep', this.episodes)
  },
  async asyncData () {
    const episodes = await getAllEpisodes()
    return { episodes }
  }
}
</script>
