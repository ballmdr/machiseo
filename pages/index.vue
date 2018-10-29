<template>
  <v-layout column>
    <v-flex xs12>
      <v-btn @click="auth0">AUTH0</v-btn>
      <nuxt-link to="/auth/logout"><v-btn>Logout</v-btn></nuxt-link>
      <v-divider></v-divider>
      <v-flex xs12 v-if="$auth.loggedIn">LOG IN</v-flex>
      <v-flex xs12 v-else>NOT LOG</v-flex>
    </v-flex>
    <v-flex xs12>
      <h1>สปอยด์ตอนล่าสุด</h1>
      <latest-episodes :episodes="episodes"></latest-episodes>
    </v-flex>
    <v-flex xs12>
      <h1>ซีรีส์ออนแอร์</h1>
      <series-onair :series="onair"></series-onair>
    </v-flex>
  </v-layout>
</template>

<script>
import { getLatestEpisodes, getSeriesOnair } from '~/assets/js/api'
import LatestEpisodes from '~/components/home/LatestEpisodes'
import SeriesOnair from '~/components/home/SeriesOnair'

export default {
  components: { LatestEpisodes, SeriesOnair },
  methods: {
    async auth0() {
      const res = await this.$auth.loginWith('auth0')
    }
  },
  mounted() {
    console.log(this.episodes)
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
  async asyncData () {
    const episodes = await getLatestEpisodes()
    const onair = await getSeriesOnair()
    return { episodes, onair }
  }
}
</script>

<style scoped>

</style>