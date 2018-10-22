<template>
<div>
  <v-card dark>
    <v-card-title v-if="review.user.length > 0">
      <v-avatar size="38"><v-img :src="review.user[0].picture"></v-img></v-avatar>
      <v-chip color="success" v-if="review.recommend"><strong>&nbsp;{{ review.user[0].name }}</strong>&nbsp;<v-icon>thumb_up</v-icon>&nbsp;แนะนำ</v-chip>
      <v-chip color="error" v-else><strong>&nbsp;{{ review.user[0].name }}</strong>&nbsp;<v-icon>thumb_down</v-icon>&nbsp;ไม่แนะนำ</v-chip>
      <v-spacer></v-spacer>
      <v-menu v-if="canAccess" name="more" bottom left>
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
          <v-list-tile @click="confirmDel = true">
            <v-list-tile-title>ลบ</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-card-text v-show="!reviewEditDialog">{{ review.reviewText }}</v-card-text>
    <div v-show="reviewEditDialog">
      <v-textarea v-model="newReviewText"></v-textarea>
      <v-btn flat round color="success" @click="vote(true)"><v-icon :disabled="!upvote">thumb_up</v-icon> <span :class="{'no-vote': !upvote}">แนะนำ</span></v-btn>
      <v-btn flat round color="error" @click="vote(false)"><v-icon :disabled="!downvote">thumb_down</v-icon> <span :class="{'no-vote': !downvote}">ไม่แนะนำ</span></v-btn>
      <v-btn round color="warning" @click="reviewEditSubmit"><span style="color:black">แก้ไขรีวิว</span></v-btn>
      <v-btn round color="danger" @click="reviewEditDialog = false">ยกเลิก</v-btn>
    </div>
    <v-card-actions>
      <span><v-btn icon @click="voteReview"><v-icon small>thumb_up</v-icon></v-btn>{{ review.like }}&nbsp;&nbsp;</span>
      <span><v-btn icon @click="showReply"><v-icon small>comment</v-icon></v-btn>{{ review.replyCount }}</span>
    </v-card-actions>
  </v-card>
  <v-flex xs8 offset-xs2 v-if="replyCardDialog">
    <v-layout column>
      <v-flex xs12>
        <reply-form v-if="$auth.$state.loggedIn" :review_id="review._id" @replyUpdate="replyUpdateLatest($event)"></reply-form>
        <review-login v-else></review-login>
      </v-flex>
      <v-flex xs12 v-for="(reply, index) in replies" :key="reply._id">
        <reply-card class="animated" :class="{fadeInDown:isNew(index)}" :reply="reply" :review_id="review._id" @replyDelete="replyRemove(index)"></reply-card>
      </v-flex>
    </v-layout>
    </v-flex>
      <v-dialog
        v-model="confirmDel"
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">แน่ใจหรือไม่ว่าจะลบ</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              flat="flat"
              @click="confirmDel = false"
            >
              ยกเลิก
            </v-btn>
            <v-btn
              color="red darken-1"
              flat="flat"
              @click="reviewDel"
            >
              ยืนยันการลบ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
import ReplyCard from '~/components/reviews/ReplyCard'
import ReplyForm from '~/components/reviews/ReplyForm'

export default {
  components: { ReplyCard, ReplyForm },
  props: ['review'],
  data () {
    return {
      new: false,
      confirmDel: false,
      reviewEditDialog: false,
      replyCardDialog: false,
      replies: [],
      upvote: false,
      downvote: false,
      newRecommend: this.review.recommend,
      newReviewText: this.review.reviewText
    }
  },
  computed: {
    canAccess() {
      if (this.$auth.$state.loggedIn) {
        if (this.review.user[0].sub === this.$auth.$state.user.sub) {
          return true
        }
      } else {
        return false
      }
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
    replyRemove(index){
      this.$toast.success('ลบตอบกลับแล้ว')
      this.replies.splice(index, 1)
      this.review.replyCount--
    },
    async replyUpdateLatest(newReply) {
      const res = await this.$axios.$get(process.env.restMongoUrl + '/reviews/replies/latest/' + this.review._id)
      this.$toast.success('ตอบรีวิวแล้ว')
      this.new = true
      this.review.replyCount++
      this.replies.unshift(res[0])
    },
    isNew (index) {
      if (this.new && index === 0) {
        return true
      } else {
        return false
      }
    },
    vote (bias) {
      if (bias) {
        this.upvote = true
        this.downvote = false
        this.newRecommend = true
      } else {
        this.upvote = false
        this.downvote = true
        this.newRecommend = false
      }
    },
    async showReply() {
      if (!this.replyCardDialog) {
        this.replies = await this.$axios.$get(process.env.restMongoUrl + '/reviews/replies/' + this.review._id)
      }
      this.replyCardDialog = !this.replyCardDialog
    },
    async voteReview () {
      await this.$axios.$put(process.env.restMongoUrl + '/reviews/vote/' + this.review._id)
      this.review.like++
    },
    async reviewEditSubmit () {
      await this.$axios.$put(process.env.restMongoUrl + '/reviews/edit',
      { 
        _id: this.review._id, 
        reviewText: this.newReviewText,
        recommend: this.newRecommend
      })
      this.$toast.success('แก้ไขรีวิวแล้ว')
      this.reviewEditDialog = false
      this.review.recommend = this.newRecommend
      this.review.reviewText = this.newReviewText
    },
    async reviewDel () {
      await this.$axios.$delete(process.env.restMongoUrl + '/reviews/delete/' + this.review._id)
      this.$emit('delReview')
    }
  }
}
</script>

<style scoped>
.no-vote {
  color: grey;
}                                          
</style> 