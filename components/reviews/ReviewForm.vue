<template>
  <v-card color="primary" >
    <v-card-title>
      <v-avatar size="38"><v-img :src="$auth.$state.user.picture"></v-img></v-avatar>&nbsp;&nbsp;<span class="headline">{{ $auth.$state.user.name }}</span>
    </v-card-title>
    <v-btn @click="$auth.logout()">Logout</v-btn>
    <v-divider dark></v-divider>
    <v-card-text>
      <v-textarea
        dark
        flat
        v-model="review_text"
        label="เขียนรีวิว"
        required
        outline
      ></v-textarea>
      <v-card-actions>
      คุณแนะนำซีรีส์เรื่องนี้หรือไม่&nbsp;
      <v-btn flat round color="success" @click="vote(true)"><v-icon large :disabled="!upvote">thumb_up</v-icon> <span :class="{'no-vote': !upvote}">แนะนำ</span></v-btn>
      <v-btn flat round color="error" @click="vote(false)"><v-icon large :disabled="!downvote">thumb_down</v-icon> <span :class="{'no-vote': !downvote}">ไม่แนะนำ</span></v-btn>
      <v-btn large round color="warning" @click="reviewSave"><span style="color:black">โพสต์รีวิว</span></v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['reviewSerie'],
  data () {
    return {
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
        this.recommend = true
      } else {
        this.upvote = false
        this.downvote = true
        this.recommend = false
      }
    },
    async reviewSave () {
      this.reviewSerie.user_sub = this.$auth.$state.user.sub
      this.reviewSerie.reviewText = this.review_text,
      this.reviewSerie.recommend = this.recommend
      await this.$axios.$post(process.env.restMongoUrl + '/reviews/add', this.reviewSerie)
      let votePoint = 0
      if (this.recommend) {
        votePoint = 1
      } else {
        votePoint = -1
      }
      await this.$axios.$post('/entity/vote?_format=json',
      {
        "type": "serie_review",
        "entity_type": ["node"],
        "entity_id": [this.reviewSerie.nid],
        "value": [votePoint],
        "value_type": ["points"]
      })
      this.review_text = ''
      this.upvote = false
      this.downvote = false
      this.$emit('reviewUpdateNew')
    },
  }
}
</script>


<style scoped>
.no-vote {
  color: grey;
}                                          
</style> 