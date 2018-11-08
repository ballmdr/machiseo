<template>
  <v-layout column>
    <v-flex xs12>
      <v-form>
        <v-card color="primary">
          <v-card-text>
            <v-textarea
              color="warning"
              v-model="review_text"
              label="เขียนรีวิว"
              outline
            ></v-textarea>
            <v-card-actions>
            <v-btn large round color="warning" @click="reviewSave"><span style="color:black">โพสต์รีวิว</span></v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-form>
    </v-flex>
    <v-flex xs12 v-for="review in reviews" :key="review._id">
      <review-card-discourse :review="review"></review-card-discourse>
    </v-flex>
  </v-layout>
</template>

<script>
import ReviewCardDiscourse from '~/components/discourse/ReviewCardDiscourse'

export default {
  components: { ReviewCardDiscourse },
  props: ['reviews'],
  data () {
    return {
      review_text: ''
    }
  },
  methods: {
    reviewSave() {
      this.$axios.$get(process.env.discourseUrl + '/u/by-external/' + this.$auth.$state.user.sub + '.json')
        .then(res => {
          console.log('res external id', res)
          this.$axios.$post(process.env.discourseUrl + '/posts?api_key=' + process.env.discourseAPI + '&api_username=' + res.user.username, 
          {
            topic_id: this.reviews[0].topic_id,
            raw: this.review_text
          }).then(res => {
            console.log('respost', res)
          }).catch(err => {
            console.log('err post', err.response.data)
          })
        }).catch(err => {
          console.log('err exter', err.response.data)
        })
    }
  }
}
</script>
