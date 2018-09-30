<template>
  <v-layout column>
    <v-flex xs12>
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
  computed: {
    user () { return (this.$store.state.auth || {}).user || null }
  },
  methods: {
  }
}
</script>

