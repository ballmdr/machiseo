<template>
  <v-layout column>
    <v-flex xs12>
      <h1>สปอยด์ตอนล่าสุด</h1>
      <latest-episodes :episodes="episodes"></latest-episodes>
    </v-flex>
    <v-flex xs12>
      <h1>ซีรีส์กำลังฮิต</h1>
      <series-hit :seriesHit="seriesHit"></series-hit>
    </v-flex>
    <v-flex xs12>
      <h1>ซีรีส์ออนแอร์</h1>
      <series-onair :series="onair"></series-onair>
    </v-flex>
    <v-flex xs12>
      <h1>ดาราออนแอร์</h1>
      <celebs-onair :series="onair"></celebs-onair>
    </v-flex>
  </v-layout>
</template>

<script>
import { getLatestEpisodes, getSeriesOnair } from '~/assets/js/api'
import SeriesHit from '~/components/home/SeriesHit'
import LatestEpisodes from '~/components/home/LatestEpisodes'
import SeriesOnair from '~/components/home/SeriesOnair'
import CelebsOnair from '~/components/home/CelebsOnair'

export default {
  components: { SeriesHit, LatestEpisodes, SeriesOnair, CelebsOnair },
  async asyncData ({ app, env }) {
    const episodes = await getLatestEpisodes()
    const onair = await getSeriesOnair()
    console.log('url', env.restMongoUrl + '/series_hit')
    const seriesHit = await app.$axios.$get(env.restMongoUrl + '/series_hit')
    console.log('home', seriesHit)
    return { episodes, onair, seriesHit }
  }
}
</script>

<style scoped>

</style>