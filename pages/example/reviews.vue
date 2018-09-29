<template>
  <v-layout column>
    <v-flex xs12>
      <review-form></review-form>
    </v-flex>
    <v-flex xs12 v-for="(review, index) in reviews" :key="index">
      <review-card :review="review"></review-card>
    </v-flex>
      <div>
        <p v-if="user">Hello, {{user.email}}</p>
          <p v-else>The user is not authenticated!</p>
        <v-btn color="primary" flat nuxt to="/login">Log In</v-btn>
        <v-btn color="primary" flat nuxt to="/admin">Admin</v-btn>
      </div>
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
  mounted() {
    console.log('auth', this.$store.state.auth.loggedIn)
  },
  computed: {
    user () { return (this.$store.state.auth || {}).user || null }
  },
  methods: {
  }
}
</script>

