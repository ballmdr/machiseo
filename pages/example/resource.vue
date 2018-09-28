<template>
  <v-layout column justify-center>
    <v-flex xs12>
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
          <v-btn large color="secondary" @click="reviewSave">โพสต์รีวิว</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 v-for="(review, index) in reviews" :key="index">
      <v-card dark>
        <v-card-title>
         <v-avatar size="38"><v-img :src="review.user.avatar"></v-img></v-avatar>
          <v-chip color="success" v-if="review.recommend"><strong>&nbsp;{{ review.user.name }}</strong>&nbsp;<v-icon>thumb_up</v-icon>&nbsp;แนะนำ</v-chip>
          <v-chip color="error" v-else><strong>&nbsp;{{ review.user.name }}</strong>&nbsp;<v-icon>thumb_down</v-icon>&nbsp;ไม่แนะนำ</v-chip>
          <v-spacer></v-spacer>
          <v-menu name="more" bottom left>
            <v-btn
              slot="activator"
              dark
              icon
            >
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile @click="reviewEditClick(index)">
                <v-list-tile-title>แก้ไข</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="reviewDel(review._id, index)">
                <v-list-tile-title>ลบ</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-card-title>
        <v-card-text>
          {{ review.reviewText }}
        </v-card-text>
        <v-card-actions>
          <span><v-btn icon @click="voteReview(review._id, index)"><v-icon small>thumb_up</v-icon></v-btn>{{ review.like }}&nbsp;&nbsp;</span>
          <span><v-btn icon @click="replyForm(review._id, index)"><v-icon small>comment</v-icon></v-btn>&nbsp;{{ review.replyCount }}</span>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-dialog v-model="replyDialog">
      <v-card dark color="primary">
        <v-card-text>
          <v-textarea
            dark
            flat
            v-model="reply_text"
            label="ตอบกลับรีวิว"
            required
          ></v-textarea>
          <v-card-actions>
            <v-btn large color="secondary" @click="replySave">ตอบกลับรีวิว</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="reviewEditDialog">
      <v-card dark color="primary">
        <v-card-text>
          <v-textarea
            dark
            flat
            v-model="currentEdit.reviewText"
            label="แก้ไขรีวิว"
            required
          ></v-textarea>
          <v-card-actions>
          แนะนำซีรีส์เรื่องนี้หรือไม่ <v-btn flat round color="success"><v-icon>thumb_up</v-icon> แนะนำ</v-btn> <v-btn flat round color="error"><v-icon>thumb_down</v-icon> ไม่แนะนำ</v-btn>
          <v-btn large color="secondary" @click="reviewEdit">แก้ไขรีวิว</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>

export default {
  data () {
    return {
      valid: false,
      recommend: null,
      review_text: '',
      reviews: [],
      upvote: false,
      downvote: false,
      replyDialog: false,
      replyIndex: 0,
      reviewEditDialog: false,
      currentEdit: {
        _id: null,
        reviewText: '',
        index: ''
      },
      reply_text: '',
      currentReviewReply: {
        _id: null,
        replyText: '',
        index: ''
      }
    }
  },
  async asyncData ({ app }) {
    const reviews = await app.$axios.$get(process.env.restMongoUrl + '/reviews')
    return { reviews }
  },
  methods: {
    async voteReview (id, index) {
      const res = await this.$axios.$put(process.env.restMongoUrl + '/reviews/vote/' + id)
      this.reviews[index].like++
    },
    replyForm (id, index) {
      this.currentReviewReply._id = id
      this.currentReviewReply.index = index
      this.replyDialog = true
    },
    async replyFormSave () {
      const res = await this.$axios.$put(process.env.restMongoUrl + '/reviews/reply/save',
      { _id: this.currentReviewReply._id, replyText: this.reply_text })
    },
    vote (bias) {
      if (bias) {
        this.upvote = true
        this.downvote = false
      } else {
        this.upvote = false
        this.downvote = true
      }
    },
    reviewEditClick (index) {
      this.currentEdit.reviewText = this.reviews[index].reviewText
      this.currentEdit._id = this.reviews[index]._id
      this.reviewEditDialog = true   
      this.currentEdit.index = index
    },
    reviewDel(id, index) {
      this.$axios.$delete(process.env.restMongoUrl + '/reviews/delete/' + id)
      this.reviews.splice(index, 1)
    },
    async reviewEdit () {
      const res = await this.$axios.$put(process.env.restMongoUrl + '/reviews/edit',
      { _id: this.currentEdit._id, reviewText: this.currentEdit.reviewText })
      this.reviews[this.currentEdit.index].reviewText = this.currentEdit.reviewText
      this.reviewEditDialog = false
    },
    async reviewInit (tmp) {
      const res = await this.$axios.$post(process.env.restMongoUrl + '/reviews/add', tmp)
    },
    async reviewSave () {
      if (this.upvote === true && this.downvote === false) {
        this.recommend = true
      } else if (this.upvote === false && this.downvote === true) {
        this.recommend = false
      }
      const res = await this.$axios.$post(process.env.restMongoUrl + '/reviews/add', 
      {
        user: {
          user_id: 1,
          avatar: 'https://materiell.com/wp-content/uploads/2015/03/doug_full1.png',
          name: 'Doug Clark'
        },
        reviewText: this.review_text,
        created: new Date(),
        updated: new Date(),
        recommend: this.recommend,
        like: 0,
        replyCount: 0,
        reply: []
      })
      this.review_text = ''
      this.upvote = false
      this.downvote = false
    },
    reviewGet () {
      const res = this.$axios.$get(process.env.restMongoUrl + '/reviews')
    },
    reply (index) {
      this.replyIndex = index 
      this.replyDialog = true
    }
  }
}
</script>

<style scoped>
.no-vote {
  color: grey;
}                                          
</style> 