<template>
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
      <span><v-btn icon @click="replyForm"><v-icon small>comment</v-icon></v-btn>&nbsp;{{ review.replyCount }}</span>
    </v-card-actions>
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
          แนะนำซีรีส์เรื่องนี้หรือไม่ <v-btn flat round color="success"><v-icon>thumb_up</v-icon> แนะนำ</v-btn> <v-btn flat round color="error"><v-icon>thumb_down</v-icon> ไม่แนะนำ</v-btn>
            <v-btn large color="secondary" @click="reviewEditSubmit">แก้ไขรีวิว</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>            
</template>

<script>
export default {
  props: ['review'],
  data () {
    return {
      reviewEditDialog: false
    }
  },
  methods: {
    async voteReview () {
      const res = await this.$axios.$put(process.env.restMongoUrl + '/reviews/vote/' + this.review._id)
      this.review.like++
    },
    async reviewEditSubmit () {
      const res = await this.$axios.$put(process.env.restMongoUrl + '/reviews/edit',
      { _id: this.review._id, reviewText: this.review.reviewText })
      this.reviewEditDialog = false
    },
    async reviewDel () {
      const res = await this.$axios.$delete(process.env.restMongoUrl + '/reviews/delete/' + this.review._id)
    }
  }
}
</script>
