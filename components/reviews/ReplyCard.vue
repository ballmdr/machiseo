<template>
  <v-card dark>
    <v-card-title v-if="reply.user.length > 0">
      <v-avatar size="38"><v-img :src="reply.user[0].picture"></v-img></v-avatar>
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
          <v-list-tile @click="replyEditDialog = true">
            <v-list-tile-title>แก้ไข</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="confirmDel = true">
            <v-list-tile-title>ลบ</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-card-text v-show="!replyEditDialog">{{ reply.replyText }}</v-card-text>
    <div v-show="replyEditDialog">
      <v-textarea v-model="newReplyText"></v-textarea>
      <v-btn round color="warning" @click="replyEditSubmit"><span style="color:black">แก้ไข</span></v-btn>
      <v-btn round color="danger" @click="replyEditDialog = false">ยกเลิก</v-btn>
    </div>
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
              @click="replyDel"
            >
              ยืนยันการลบ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-card>
</template>

<script>
export default {
  props: ['reply', 'review_id'],
  data() {
    return {
      confirmDel: false,
      replyEditDialog: false,
      newReplyText: this.reply.replyText
    }
  },
  computed: {
    canAccess() {
      if (this.$auth.$state.loggedIn) {
        if (this.reply.user[0].sub === this.$auth.$state.user.sub) {
          return true
        }
      } else {
        return false
      }
    }
  },
  methods: {
    async replyDel() {
      await this.$axios.$delete(process.env.restMongoUrl + '/reviews/reply/delete/' + this.reply._id)
      await this.$axios.$put(process.env.restMongoUrl + '/reviews/replyCount/del/' + this.review_id)
      this.$emit('replyDelete')
    },
    async replyEditSubmit() {
      await this.$axios.$put(process.env.restMongoUrl + '/reviews/reply/edit', {
        _id: this.reply._id,
        replyText: this.newReplyText
      })
      this.$toast.success('แก้ไขตอบกลับแล้ว')
      this.replyEditDialog = false
      this.reply.replyText = this.newReplyText
    }
  }
}
</script>
