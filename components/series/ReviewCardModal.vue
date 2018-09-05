<template>
  <v-layout column >
    <v-flex xs12>
      <v-card color="grey lighten-3" light>
        <v-card-title>
          <v-avatar size="36px">
            <v-img :src="tmpBaseUrl + user.user_picture.url"></v-img>
          </v-avatar>
          <v-spacer></v-spacer>
          <h5 class="headline">{{ user.name }}</h5>
        </v-card-title>
        <v-card-text v-html="review.comment_body[0].processed"></v-card-text>
        <v-divider light></v-divider>
        <v-layout column v-if="hasReply">
          <v-flex xs12 v-for="(reply, index) in replies" :key="index">
            <v-card-title>
              <v-avatar size="36px">
                <v-img :src="tmpBaseUrl + userReply[index].user_picture.url"></v-img>
              </v-avatar>
              <v-spacer></v-spacer>
              <h5 class="headline">{{ userReply[index].name }}</h5>
            </v-card-title>
            <v-card-text v-html="reply.comment_body[0].processed"></v-card-text>
            <v-divider light></v-divider>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { getRecentReply } from '~/assets/js/drupalRest'
import { getUserById } from '~/assets/js/apiWaterwheel'

export default {
  props: ['user', 'review'],
  data () {
    return {
      tmpBaseUrl: process.env.baseUrl,
      replies: [],
      userReply: [],
      hasReply: false
    }
  },
  async mounted () {
    this.replies = []
    this.replies = await getRecentReply(this.review.cid[0].value)
    const len = this.replies.length
    if (len > 0) {
      this.userReply = []
      for (let i = 0; i < len; i ++) {
        this.userReply[i] = await getUserById(this.replies[i].uid[0].target_uuid)
      }
      this.hasReply = true
    }
  }
}
</script>
