<template>
  <v-layout column>
    <v-flex xs12>
      <h1>อ่านสปอยด์</h1>
      <latest-episodes :episodes="episodes"></latest-episodes>
    </v-flex>
    <v-flex xs12>
      <h1>ตัวอย่างซีรีส์</h1>
      <viu-widget :vid_id="widgetId" :serie_title="WidgetTitle"></viu-widget>
    </v-flex>
    <v-flex xs12>
      <h1>ช่วงนี้ดูอะไรดี</h1>
      <series-hit :seriesHit="seriesHit"></series-hit>
    </v-flex>
    <v-flex xs12>
      <h1>เรื่องอะไรออนแอร์</h1>
      <series-onair :series="onair"></series-onair>
    </v-flex>
    <v-flex xs12>
      <h1>ดาราฮอตตอนนี้</h1>
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
import ViuWidget from '~/components/series/ViuWidget'

export default {
  components: { SeriesHit, LatestEpisodes, SeriesOnair, CelebsOnair, ViuWidget },
  data () {
    return {
      widgetId: '115882',
      widgetTitle: 'Encounter'
    }
  },
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