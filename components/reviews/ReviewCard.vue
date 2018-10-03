<template>
<v-layout>
  <v-card dark>
    <v-card-title v-if="review.user.length > 0">
      <v-avatar size="38"><v-img :src="review.user[0].picture"></v-img></v-avatar>
      <v-chip color="success" v-if="review.recommend"><strong>&nbsp;{{ review.user[0].name }}</strong>&nbsp;<v-icon>thumb_up</v-icon>&nbsp;แนะนำ</v-chip>
      <v-chip color="error" v-else><strong>&nbsp;{{ review.user[0].name }}</strong>&nbsp;<v-icon>thumb_down</v-icon>&nbsp;ไม่แนะนำ</v-chip>
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
          <v-list-tile @click="reviewEditDialog = true">
            <v-list-tile-title>แก้ไข</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="reviewDel">
            <v-list-tile-title>ลบ</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-card-text>
      {{ review.reviewText }}
    </v-card-text>
    <v-card-actions>
      <span><v-btn icon @click="voteReview"><v-icon small>thumb_up</v-icon></v-btn>{{ review.like }}&nbsp;&nbsp;</span>
      <span><v-btn icon @click="showReply"><v-icon small>comment</v-icon></v-btn>{{ review.replyCount }}</span>
    </v-card-actions>
  </v-card>
  <v-dialog v-model="reviewEditDialog">
    <v-card dark color="primary">
      <v-card-text>
        <v-textarea
          dark
          flat
          v-model="review.reviewText"
          label="แก้ไขรีวิว"
          required
        ></v-textarea>
        <v-card-actions>
          แนะนำซีรีส์เรื่องนี้หรือไม่       
          <v-btn flat round color="success" @click="vote(true)"><v-icon large :disabled="!upvote">thumb_up</v-icon> <span :class="{'no-vote': !upvote}">แนะนำ</span></v-btn>
          <v-btn flat round color="error" @click="vote(false)"><v-icon large :disabled="!downvote">thumb_down</v-icon> <span :class="{'no-vote': !downvote}">ไม่แนะนำ</span></v-btn>
          <v-btn large color="secondary" @click="reviewEditSubmit">แก้ไขรีวิว</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog v-model="replyCardDialog">
    <v-layout column>
      <v-flex xs12>
      <v-card dark>
        <v-card-title v-if="review.user.length > 0">
          <v-avatar size="38"><v-img :src="review.user[0].picture"></v-img></v-avatar>
          <v-chip color="success" v-if="review.recommend"><strong>&nbsp;{{ review.user[0].name }}</strong>&nbsp;<v-icon>thumb_up</v-icon>&nbsp;แนะนำ</v-chip>
          <v-chip color="error" v-else><strong>&nbsp;{{ review.user[0].name }}</strong>&nbsp;<v-icon>thumb_down</v-icon>&nbsp;ไม่แนะนำ</v-chip>
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
              <v-list-tile @click="reviewEditDialog = true">
                <v-list-tile-title>แก้ไข</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="reviewDel">
                <v-list-tile-title>ลบ</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-card-title>
        <v-card-text>
          {{ review.reviewText }}
        </v-card-text>
        <v-card-actions>
          <span><v-btn icon @click="voteReview"><v-icon small>thumb_up</v-icon></v-btn>{{ review.like }}&nbsp;&nbsp;</span>
          <span><v-btn icon><v-icon small>comment</v-icon></v-btn>{{ review.replyCount }}</span>
        </v-card-actions>
      </v-card>
      </v-flex>
      <v-divider light></v-divider>
      <v-flex xs12>
        <reply-form v-if="$auth.$state.loggedIn" :review_id="review._id"></reply-form>
        <review-login v-else></review-login>
      </v-flex>
      <v-divider></v-divider>
      <v-flex xs12 v-for="reply in replies" :key="reply._id">
        <reply-card :reply="reply" :review_id="review._id"></reply-card>
      </v-flex>
    </v-layout>
    </v-dialog>
  </v-layout>
</template>

<script>
import ReplyCard from '~/components/reviews/ReplyCard'
import ReplyForm from '~/components/reviews/ReplyForm'

export default {
  components: { ReplyCard, ReplyForm },
  props: ['review'],
  data () {
    return {
      reviewEditDialog: false,
      replyCardDialog: false,
      replies: [],
      upvote: false,
      downvote: false,
      recommend: null
    }
  },
  mounted() {
    if (this.review.recommend) {
      this.upvote = true
      this.downvote = false
    } else {
      this.upvote = false
      this.downvote = true
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
    async showReply() {
      this.replies = await this.$axios.$get(process.env.restMongoUrl + '/reviews/replies/' + this.review._id)
      this.replyCardDialog = true
    },
    async voteReview () {
      await this.$axios.$put(process.env.restMongoUrl + '/reviews/vote/' + this.review._id)
      this.review.like++
    },
    async reviewEditSubmit () {
      if (this.upvote === true && this.downvote === false) {
        this.recommend = true
      } else if (this.upvote === false && this.downvote === true) {
        this.recommend = false
      }
      await this.$axios.$put(process.env.restMongoUrl + '/reviews/edit',
      { 
        _id: this.review._id, 
        reviewText: this.review.reviewText,
        recommend: this.recommend
      })
      this.reviewEditDialog = false
    },
    async reviewDel () {
      await this.$axios.$delete(process.env.restMongoUrl + '/reviews/delete/' + this.review._id)
    }
  }
}
</script>

<style scoped>
.no-vote {
  color: grey;
}                                          
</style> 