<template>
  <v-layout row wrap>
    <v-flex xs12>
      <h1>{{ episodes[ep_index].title }}</h1>
    </v-flex>
    <v-flex xs12 sm10>
      <v-card>
        <v-card-text v-html="episodes[ep_index].body.processed" class='img-width'></v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { getAllEpisodesBySeriesPath } from '~/assets/js/api'

export default {

  mounted(){
    console.log(this.$route.params)
    console.log(this.episodes)
  },
  async asyncData ({ params, store }) {
    const episodes = await getAllEpisodesBySeriesPath(params.slug)
    await store.dispatch('episodes/setEpWithData', episodes)
    let ep_index = null
    episodes.forEach((el, index) => {
      if (el.title === params.title)
        ep_index = index
    })
    return { episodes, ep_index }
  }
}
</script>