<template>
  <v-layout column>
    <v-flex xs12>
      <v-form v-if="$auth.$state.loggedIn">
        <v-card color="primary">
          <v-card-title>
            <v-avatar size="38"><v-img :src="$auth.$state.user.picture"></v-img></v-avatar>&nbsp;&nbsp;<span class="headline">{{ $auth.$state.user.name }}</span>
          </v-card-title>
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
      <review-login v-else></review-login>
    </v-flex>
    <v-flex xs12 v-for="(review, index) in reviews" :key="review._id">
      <review-card-discourse class="animated" :class="{pulse:isNew(index)}" :review="review"></review-card-discourse>
    </v-flex>
  </v-layout>
</template>

<script>
import ReviewCardDiscourse from '~/components/discourse/ReviewCardDiscourse'
import ReviewLogin from '~/components/reviews/ReviewLogin'

export default {
  components: { ReviewCardDiscourse, ReviewLogin },
  props: ['reviews'],
  data () {
    return {
      review_text: '',
      new: false
    }
  },
  methods: {
    isNew (index) {
      if (this.new && index === 0) {
        return true
      } else {
        return false
      }
    },
    async reviewSave () {
      const tmpHeaders = this.$axios.defaults.headers
      this.$axios.defaults.headers = {
        'Accept': 'application/json'
      }
      const res = await this.$axios.$get(process.env.discourseUrl + '/u/by-external/' + this.$auth.$state.user.sub + '.json')
      const lastPost = await this.$axios.$post(process.env.discourseUrl + '/posts?api_key=' + process.env.discourseAPI + '&api_username=' + res.user.username,
        {
          topic_id: this.reviews[0].topic_id,
          raw: this.review_text
        })
      this.$toast.success('รีวิวของคุณมีค่าเป็นอย่างมาก ขอบคุณที่ร่วมรีวิว')
      this.new = true
      this.reviews.unshift(lastPost)
      this.$axios.defaults.headers = tmpHeaders
      this.review_text = ''
    }
  }
}
</script>
