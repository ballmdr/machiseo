<template>
  <v-card dark>
    <v-card-title v-if="reply.user.length > 0">
      <v-avatar size="38"><v-img :src="reply.user[0].picture"></v-img></v-avatar>
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
          <v-list-tile @click="replyEditDialog = true">
            <v-list-tile-title>แก้ไข</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="replyDel">
            <v-list-tile-title>ลบ</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-card-text>
      <span>{{ reply.replyText }}</span>
    </v-card-text>

    <v-dialog v-model="replyEditDialog">
    <v-card dark color="primary">
      <v-card-text>
        <v-textarea
          dark
          flat
          v-model="reply.replyText"
          label="แก้ไขตอบกลับ"
          required
        ></v-textarea>
        <v-card-actions>
          <v-btn color="warning" @click="replyEditSubmit">แก้ไขตอบกลับ</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
  </v-card>
</template>

<script>
export default {
  props: ['reply', 'review_id'],
  data() {
    return {
      replyEditDialog: false
    }
  },
  methods: {
    async replyDel() {
      await this.$axios.$delete(process.env.restMongoUrl + '/reviews/reply/delete/' + this.reply._id)
      await this.$axios.$put(process.env.restMongoUrl + '/reviews/replyCount/del/' + this.review_id)
      this.$emit('replyDelete', this.reply._id)
    },
    async replyEditSubmit() {
      await this.$axios.$put(process.env.restMongoUrl + '/reviews/reply/edit', {
        _id: this.reply._id,
        replyText: this.reply.replyText
      })
    }
  }
}
</script>
