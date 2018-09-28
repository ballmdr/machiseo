<template>
  <v-layout column>
    <v-flex xs12>
      <button @click="auth('facebook')">auth Facebook</button>
      <review-form></review-form>
    </v-flex>
    <v-flex xs12 v-for="(review, index) in reviews" :key="index">
      <review-card :review="review"></review-card>
    </v-flex>
  </v-layout>
</template>

<script>
import ReviewForm from '~/components/reviews/ReviewForm'
import ReviewCard from '~/components/reviews/ReviewCard'

export default {
  components: { ReviewForm, ReviewCard },
  async asyncData ({ app }) {
    const reviews = await app.$axios.$get(process.env.restMongoUrl + '/reviews')
    return { reviews }
  },
  methods: {
    async auth (provider) {
      console.log('auth', this.$auth)
      const res = await this.$auth.authenticate(provider)
      console.log('res', res)
      console.log('token', this.$auth.getToken)
      this.$auth.setToken(res.access_token)
    }
  }
}
</script>

