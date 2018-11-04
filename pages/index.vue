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
      <h1>ซีรีส์ที่กำลังเป็นกระแส</h1>
      <series-sticky :sticky="sticky"></series-sticky>
    </v-flex>
    <v-flex xs12>
      <h1>ซีรีส์ออนแอร์</h1>
      <series-onair :series="onair"></series-onair>
    </v-flex>
    <v-flex xs12>
      <h1>ดาราออนแอร์</h1>
      <celebs-onair :series="onair"></celebs-onair>
    </v-flex>
    <v-dialog transition="dialog-bottom-transition" v-model="epDialog" scrollable max-width="700px">
      <v-card light>
        <v-toolbar class="purple white--text headline">สปอยด์ {{ fieldName }} ตอนที่ {{ title }}
          <v-spacer></v-spacer>
          <v-btn icon dark @click="closeEpDialog()"><v-icon>close</v-icon></v-btn>
        </v-toolbar>
        <v-layout column>
          <v-flex xs8>
              <v-carousel style="max-height:300px;">
                <v-carousel-item
                  style="background-color:black;"
                  v-for="(item,i) in imgStreaming"
                  :key="i"
                ><v-img :src="baseUrl + item.url" style="max-width:500px;margin:auto;"></v-img></v-carousel-item>
              </v-carousel>
          </v-flex>
          <v-flex xs8 style="overflow:auto;">
            <v-card-text style="padding:50px;">
              <p v-html="body"></p>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { getLatestEpisodes, getSeriesOnair, getSeriesSticky } from '~/assets/js/api'
import SeriesSticky from '~/components/home/SeriesSticky'
import LatestEpisodes from '~/components/home/LatestEpisodes'
import SeriesOnair from '~/components/home/SeriesOnair'
import CelebsOnair from '~/components/home/CelebsOnair'

export default {
  components: { SeriesSticky, LatestEpisodes, SeriesOnair, CelebsOnair },
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
    console.log('onair', this.onair[0])
    console.log('sticky', this.sticky)
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
    const sticky = await getSeriesSticky()
    return { episodes, onair, sticky }
  }
}
</script>

<style scoped>

</style>