<template>
  <v-card>
    <v-card-title>
      <v-avatar size="45"><img :src="discourseUrl + avatar" /></v-avatar>
      &nbsp;<strong v-text="review.username"></strong>
    </v-card-title>
    <v-card-text v-html="review.cooked"></v-card-text>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      discourseUrl: process.env.discourseUrl,
      avatar: ''
    }
  },
  props: ['review'],
  mounted() {
    this.avatar = this.review.avatar_template.replace(/{size}/gi, '90')
  }
}
</script>
