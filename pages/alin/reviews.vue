<template>
  <v-layout row wrap>
    <h2>จำนวนทั้งหมด {{ reviews.length }}</h2>
    <v-flex xs6 v-for="(review, index) in reviews" :key="index">
      <review-serie :review="review"></review-serie>
    </v-flex>
  </v-layout>
</template>

<script>
import ReviewSerie from '~/components/reviews/ReviewSerie'

export default {
  components: { ReviewSerie },
  middleware: ['user-auth'],
  async asyncData ({ app, env }) {
    const reviews = await app.$axios.$get(env.restMongoUrl + '/reviews')
    return { reviews }
  }
}
</script>


