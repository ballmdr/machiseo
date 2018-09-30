<template>
  <v-card dark color="primary">
    <v-card-text>
      <v-textarea
        dark
        flat
        v-model="review_text"
        label="เขียนรีวิว"
        required
      ></v-textarea>
      <v-card-actions>
      คุณแนะนำซีรีส์เรื่องนี้หรือไม่&nbsp;
      <v-btn flat round color="success" @click="vote(true)"><v-icon large :disabled="!upvote">thumb_up</v-icon> <span :class="{'no-vote': !upvote}">แนะนำ</span></v-btn>
      <v-btn flat round color="error" @click="vote(false)"><v-icon large :disabled="!downvote">thumb_down</v-icon> <span :class="{'no-vote': !downvote}">ไม่แนะนำ</span></v-btn>
      <v-btn large color="warning" @click="reviewSave"><span style="color:black">โพสต์รีวิว</span></v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      user_id: "5bade30809c71f0008abec60",
      review_text: '',
      recommend: null,
      upvote: false,
      downvote: false
    }
  },
  methods: {
    vote (bias) {
      if (bias) {
        this.upvote = true
        this.downvote = false
      } else {
        this.upvote = false
        this.downvote = true
      }
    },
    async reviewSave () {
      if (this.upvote === true && this.downvote === false) {
        this.recommend = true
      } else if (this.upvote === false && this.downvote === true) {
        this.recommend = false
      }
      await this.$axios.$post(process.env.restMongoUrl + '/reviews/add', 
      {
        user_id: this.user_id,
        reviewText: this.review_text,
        recommend: this.recommend,
      })
      this.review_text = ''
      this.upvote = false
      this.downvote = false
    },
  }
}
</script>


<style scoped>
.no-vote {
  color: grey;
}                                          
</style> 