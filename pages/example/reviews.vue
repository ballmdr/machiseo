<template>
  <v-layout column>
    <v-flex xs12>
      <review-form v-if="$auth.$state.loggedIn"></review-form>
      <review-login v-else></review-login>
    </v-flex>
    <v-flex xs12 v-for="(review, index) in reviews" :key="index">
      <review-card :review="review"></review-card>
    </v-flex>
  </v-layout>
</template>

<script>
import ReviewForm from '~/components/reviews/ReviewForm'
import ReviewCard from '~/components/reviews/ReviewCard'
import ReviewLogin from '~/components/reviews/ReviewLogin'

export default {
  components: { ReviewForm, ReviewCard, ReviewLogin },
  async fetch({ app, store }) {
    if (!store.state.users.userDone && app.$auth.loggedIn) {
      const res = await app.$axios.$get(process.env.restMongoUrl + '/users/sub/' + app.$auth.$state.user.sub)
      if (res.length > 0) {
        await app.$axios.$put(process.env.restMongoUrl + '/users/update/' + res[0]._id, app.$auth.$state.user)
      } else {
        await app.$axios.$post(process.env.restMongoUrl + '/users/create', app.$auth.$state.user)
      }
      store.dispatch('users/setUserDone')
    }
  },
  async asyncData ({ app }) {
    const reviews = await app.$axios.$get(process.env.restMongoUrl + '/reviews')
    return { reviews }
  },
  computed: {
    user () { return (this.$store.state.auth || {}).user || null }
  },
  methods: {
  }
}
</script>

