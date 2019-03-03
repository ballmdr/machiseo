<template>
<div>
  <div>
    <v-layout columns v-if="review.user.length > 0">
      <v-flex xs2 class="text-xs-right">
        <div><v-avatar size="38"><v-img :src="review.user[0].picture"></v-img></v-avatar></div>
        <div v-if="canAccess">
          <div><v-btn icon @click="reviewEditDialog = true" small><v-icon small>far fa-edit</v-icon></v-btn></div>
          <div><v-btn icon @click="confirmDel = true" small><v-icon small>far fa-trash-alt</v-icon></v-btn></div>
        </div>
      </v-flex>
      <v-flex xs10>
        <div>รีวิวโดย&nbsp;{{ review.user[0].name }}</div>
        <div><v-rating v-model="currentScore" color="yellow" half-increments small readonly></v-rating></div>
        <div v-show="!reviewEditDialog" class="review-text">{{ review.review_text }}</div>
        <div v-show="reviewEditDialog" class="review-text">
          <v-card-actions>
            <v-rating v-model="currentScore" color="yellow" half-increments medium></v-rating>
          </v-card-actions>
          <v-textarea v-model="newReviewText"></v-textarea>
          <v-btn round color="warning" @click="reviewEditSubmit"><span style="color:black">แก้ไขรีวิว</span></v-btn>
          <v-btn round color="danger" @click="reviewEditDialog = false">ยกเลิก</v-btn>
        </div>
        <div class="icon-action">
          <v-btn v-if="!liked" icon @click="like"><v-icon color="red">far fa-kiss-wink-heart</v-icon></v-btn>{{ review.like }}
          <!--<span><v-btn icon @click="dislike"><v-icon small>thumb_down</v-icon></v-btn>{{ review.dislike }}&nbsp;&nbsp;</span>-->
          <v-btn icon @click="showReply"><v-icon small>far fa-comments</v-icon></v-btn>{{ review.reply }}
        </div>
      </v-flex>
    </v-layout>
  </div>
  <!-- end main card -->

  <!-- begin dialog -->
  <v-flex xs8 offset-xs2 v-if="replyCardDialog">
    <v-layout column>
      <v-flex xs12>
        <reply-form v-if="$auth.$state.loggedIn" :review_id="review._id" @replyUpdate="replyUpdateLatest()" @replyClose="showReply"></reply-form>
        <review-login v-else></review-login>
      </v-flex>
      <v-flex xs12 v-for="(reply, index) in replies" :key="reply._id">
        <reply-card class="animated" :class="{fadeInDown:isNew(index)}" :reply="reply" :review_id="review._id" @replyDelete="replyRemove(index)"></reply-card>
      </v-flex>
    </v-layout>
  </v-flex>

  <!-- confirm dialog -->
  <v-dialog
    v-model="confirmDel"
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">ยืนยันการลบ</v-card-title>
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
      newReviewText: this.review.review_text,
      currentScore: this.review.score
    }
  },
  computed: {
    canAccess () {
      if (this.$auth.$state.loggedIn) {
        if (this.review.sub_id === this.$store.getters['users/subId']) {
          return true
        }
      } else {
        return false
      }
    },
    liked () {
      const likeId = this.$store.getters['reviews/likeReview']
      if (this.isInArray(this.review_id, likeId.review_like)) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    console.log('likeReview', this.$store.getters['reviews/likeReview'])
  },
  methods: {
    isInArray (value, array) {
      return array.indexOf(value) > -1
    },
    setScore (score) {
      this.currentScore = score
    },
    replyRemove (index) {
      this.$toast.success('ลบตอบกลับแล้ว')
      this.replies.splice(index, 1)
      this.review.reply--
    },
    async replyUpdateLatest (newReply) {
      const res = await this.$axios.$get(process.env.restMongoUrl + '/reviews/replies/latest/' + this.review._id)
      this.$toast.success('ตอบรีวิวแล้ว')
      this.new = true
      this.review.reply++
      this.replies.unshift(res[0])
    },
    isNew (index) {
      if (this.new && index === 0) {
        return true
      } else {
        return false
      }
    },
    async showReply () {
      if (!this.replyCardDialog) {
        this.replies = await this.$axios.$get(process.env.restMongoUrl + '/reviews/replies/' + this.review._id)
      }
      this.replyCardDialog = !this.replyCardDialog
    },
    async like () {
      await this.$axios.$put(process.env.restMongoUrl + '/reviews/like/' + this.review._id)
      this.review.like++
    },
    async reviewEditSubmit () {
      await this.$axios.$put(process.env.restMongoUrl + '/reviews/edit',
        {
          _id: this.review._id,
          review_text: this.newReviewText,
          score: this.currentScore
        })
      this.$toast.success('แก้ไขรีวิวแล้ว')
      this.reviewEditDialog = false
      this.review.score = this.currentScore
      this.review.review_text = this.newReviewText
    },
    async reviewDel () {
      await this.$axios.$put(process.env.restMongoUrl + '/reviews/hide/' + this.review._id)
      this.$emit('delReview')
    }
  }
}
</script>

<style scoped>
.no-vote {
  color: grey;
}                   
.selecting {
  color: green;
}                   
.review-text {
  padding-top: 20px;
}    
.icon-action {
  margin-top:20px;
  margin-left: -15px;
  margin-bottom: 15px;
}
</style> 