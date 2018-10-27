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


