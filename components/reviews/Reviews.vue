<template>
  <v-layout column>
    <v-flex xs12>
      <review-form v-if="$auth.$state.loggedIn" :reviewSerie="reviewSerie" @reviewUpdateNew="updateLatest"></review-form>
      <review-login v-else></review-login>
    </v-flex>
    <v-flex xs12 v-for="(review, index) in reviews" :key="review._id">
      <review-card class="animated" :class="{pulse:isNew(index)}" :review="review" @delReview="deleteReview(index)"></review-card>
    </v-flex>
  </v-layout>
</template>

<script>
import ReviewForm from '~/components/reviews/ReviewForm'
import ReviewCard from '~/components/reviews/ReviewCard'
import ReviewLogin from '~/components/reviews/ReviewLogin'

export default {
  props: ['reviewSerie'],
  data() {
    return {
      reviews: [],
      new: false
    }
  },
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
  mounted() {
    this.$axios.$get(process.env.restMongoUrl + '/reviews/' + this.reviewSerie.uuid).then(reviews => {
      this.reviews = reviews
    })  
  },
  methods: {
    isNew (index) {
      if (this.new && index === 0) {
        return true
      } else {
        return false
      }
    },
    async updateLatest() {
      const res = await this.$axios.$get(process.env.restMongoUrl + '/reviews/latest/' + this.reviewSerie.uuid)
      this.new = true
      this.$toast.success('รีวิวของคุณมีค่า ขอบคุณที่ร่วมรีวิว')
      this.reviews.unshift(res[0])
    },
    async deleteReview(index) {
      this.$toast.success('ลบรีวิวแล้ว')
      this.reviews.splice(index, 1)
    }
  }
}
</script>


