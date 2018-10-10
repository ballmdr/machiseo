<template>
  <v-card color="primary">
    <v-card-text>
      <v-avatar size="38"><v-img :src="$auth.$state.user.picture"></v-img></v-avatar>
      <v-textarea label="ตอบรีวิว" v-model="reply.replyText"></v-textarea>
    </v-card-text>
    <v-card-actions><v-spacer></v-spacer><v-btn @click="replySubmit" color="warning"><span style="color:black">ตอบรีวิว</span></v-btn></v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['review_id'],
  data () {
    return {
      reply: {
        replyText: '',
        review_id: this.review_id,
        user_sub: this.$auth.user.sub
      }
    }
  },
  methods: {
    async replySubmit() {
      await this.$axios.$post(process.env.restMongoUrl + '/reviews/reply/add', this.reply)
      await this.$axios.$put(process.env.restMongoUrl + '/reviews/replyCount/add/' + this.reply.review_id)
      this.reply.replyText = ''
      this.$emit('replyUpdate', this.reply)
    }
  }
}
</script>
