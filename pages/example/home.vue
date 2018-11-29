<template>
  <v-layout column>
    <v-flex xs12>
      <v-layout row>
        <v-flex xs4>
          <v-card>
            <v-toolbar color="primary">VIU Widget</v-toolbar>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card>
            <v-toolbar color="primary">Video</v-toolbar>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card>
            <v-toolbar color="primary">OST</v-toolbar>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-toolbar color="primary">ซีรีส์ฮิต</v-toolbar>
        <v-card-text><series-hit :series="series_hit"></series-hit></v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-toolbar color="primary">ซีรีส์แนะนำ</v-toolbar>
        <v-card-text><series-recommend :series="series_recommend"></series-recommend></v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-toolbar color="primary">ซีรีส์ออนแอร์</v-toolbar>
        <v-card-text><series-onair :series="series_onair"></series-onair></v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-toolbar color="primary">ดารา</v-toolbar>
        <v-card-text><celebs :celebs="celebs"></celebs></v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SeriesHit from '~/components/admin/SeriesHit'
import SeriesRecommend from '~/components/admin/SeriesRecommend'
import SeriesOnair from '~/components/admin/SeriesOnair'
import Celebs from '~/components/admin/Celebs'

export default {
  components: { SeriesHit, SeriesRecommend, SeriesOnair, Celebs },
  async asyncData ({ app }) {
    let res = await app.$axios.get(process.env.restMongoUrl + '/admin/home/series_hit')
    const series_hit = res.data
    res = await app.$axios.get(process.env.restMongoUrl + '/admin/home/series_recommend')
    const series_recommend = res.data
    res = await app.$axios.get(process.env.restMongoUrl + '/admin/home/series_onair')
    const series_onair = res.data
    res = await app.$axios.get(process.env.restMongoUrl + '/admin/home/celebs')
    const celebs = res.data
    res = await app.$axios.get(process.env.restMongoUrl + '/admin/home/widget')
    const widget = res.data
    return { series_hit, series_recommend, series_onair, celebs, widget }
  }
}
</script>
