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
import { getLatestEpisodes, getSeriesOnair, getSeriesSticky } from '~/assets/js/api'
import SeriesHit from '~/components/home/SeriesHit'
import LatestEpisodes from '~/components/home/LatestEpisodes'
import SeriesOnair from '~/components/home/SeriesOnair'
import CelebsOnair from '~/components/home/CelebsOnair'

export default {
  components: { SeriesHit, LatestEpisodes, SeriesOnair, CelebsOnair },
  data () {
    return {
      epDialog: false
      
    }
  },
  methods: {
    async auth0() {
      const res = await this.$auth.loginWith('auth0')
    }
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$axios.$get(process.env.restMongoUrl + '/users/sub/' + this.$auth.$state.user.sub).then(user => {
        if (user.length > 0) {
          // user exist
          if (this.$auth.$state.user.name !== user[0].name || this.$auth.$state.user.picture !== user[0].picture) {
            this.$axios.$put(process.env.restMongoUrl + '/users/update/' + user[0]._id, this.$auth.$state.user)
          }
        } else {
          // not exist
          this.$axios.$post(process.env.restMongoUrl + '/users/create', this.$auth.$state.user)
        }
      })
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