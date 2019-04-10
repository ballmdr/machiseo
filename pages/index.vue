<template>
  <v-layout column>
    <v-flex xs12>
      <h1>อ่านสปอยด์ <v-icon large style="margin-bottom:10px;">fas fa-book-reader</v-icon></h1>
      <latest-episodes :episodes="episodes"></latest-episodes>
    </v-flex>
    <v-flex xs12>
      <h1>มุมฟังเพลง OST อัพเดทล่าสุด</h1>
      <sound-cloud :soundCloudId="soundId"></sound-cloud>
    </v-flex>
    <v-flex xs12 class="text-xs-center">
      <h1><nuxt-link to="/series/touch-your-heart">ตัวอย่างซีรีส์เกาหลี Touch Your Heart</nuxt-link>&nbsp;<v-icon large style="margin-bottom:10px;">fas fa-video</v-icon></h1>
      <viu-widget :vid_id="widgetId" :serie_title="widgetTitle"></viu-widget>
    </v-flex>
    <v-flex xs12>
      <h1>ช่วงนี้อะไรโคตรฮิต <v-icon large style="margin-bottom:10px;">fab fa-hotjar</v-icon></h1>
      <series-hit :seriesHit="seriesHit"></series-hit>
    </v-flex>
    <v-flex xs12>
      <h1>เรื่องอะไรออนแอร์ <v-icon large style="margin-bottom:10px;">fas fa-broadcast-tower</v-icon></h1>
      <series-onair :series="onair"></series-onair>
    </v-flex>
    <v-flex xs12>
      <h1>ดาราฮอตตอนนี้ <v-icon large style="margin-bottom:10px;">fas fa-user-circle</v-icon></h1>
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
import SoundCloud from '~/components/series/SoundCloud'

export default {
  components: { SeriesHit, LatestEpisodes, SeriesOnair, CelebsOnair, ViuWidget, SoundCloud },
  data () {
    return {
      widgetId: '136996',
      widgetTitle: 'Her Private Life',
      soundId: '4767794'
    }
  },
  async asyncData ({ app, env }) {
    const episodes = await getLatestEpisodes(10)
    const onair = await getSeriesOnair()
    const seriesHit = await app.$axios.$get(env.restMongoUrl + '/series_hit')
    return { episodes, onair, seriesHit }
  }
}
</script>

<style scoped>

</style>