<template>
  <v-card color="primary">
    <v-card-text>
      <v-textarea label="ตอบรีวิว" v-model="reply_text"></v-textarea>
    </v-card-text>
    <v-card-actions><v-spacer></v-spacer><v-btn @click="replySubmit" color="warning"><span style="color:black">ตอบรีวิว</span></v-btn></v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['review_id'],
  data () {
    return {
      reply_text: ''
    }
  },
  methods: {
    async replySubmit() {
      await this.$axios.$post(process.env.restMongoUrl + '/reviews/reply/add', 
      {
        "replyText": this.reply_text,
        "user_id": "5bade30809c71f0008abec60",
        "created": new Date(),
        "updated": new Date(),
        "review_id": this.review_id
      })
      await this.$axios.$put(process.env.restMongoUrl + '/reviews/replyCount/add/' + this.review_id)
    }
  }
}
</script>
