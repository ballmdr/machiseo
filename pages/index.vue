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

    </v-flex>
  </v-layout>
</template>

<script>
import { getLatestEpisodes } from '~/assets/js/api'
import EpisodeCard from '~/components/episodes/EpisodeCard'

export default {
  components: { EpisodeCard },
  data () {
    return {
      baseUrl: process.env.baseUrl,
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 50,
        // init: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      }
    }
  },
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
    return { episodes }
  }
}
</script>

<style scoped>
.poster-above {
  z-index: 1;
  margin-top: -70px;
 
}
.poster-above .poster {
  border-radius: 12px;
  box-shadow: 0 13px 26px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.2);
  max-width: 80px;
}
</style>