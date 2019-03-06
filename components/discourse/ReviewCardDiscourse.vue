<template>
  <v-card>
    <v-card-title>
      <v-avatar size="45"><img :src="discourseUrl + avatar" /></v-avatar>
      &nbsp;<strong v-text="review.username"></strong>
    </v-card-title>
    <v-card-text v-html="review.cooked"></v-card-text>
    <v-card-actions><v-btn icon @click="likePost"><v-icon color="warning">far fa-thumbs-up</v-icon></v-btn> <span v-if="like > 0" v-text="like" class="warning--text"></span></v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      discourseUrl: process.env.discourseUrl,
      avatar: '',
      like: 0
    }
  },
  props: ['review'],
  methods: {
    async likePost () {
      const tmpHeaders = this.$axios.defaults.headers
      this.$axios.defaults.headers = {
        'Accept': 'application/json'
      }
      const user = await this.$axios.$get(process.env.discourseUrl + '/u/by-external/' + this.$auth.$state.user.sub + '.json')
      this.$axios.$post(process.env.discourseUrl + '/post_actions?api_key=' + process.env.discourseAPI + '&api_username=' + user.user.username,
        {
          id: this.review.id,
          post_action_type_id: 2
        }).then((res) => {
        this.like++
      }).catch((err) => {
        console.log(err.response.data)
      }).finally(() => {
        this.$axios.defaults.headers = tmpHeaders
      })
    }
  },
  mounted () {
    console.log(this.review)
    if (this.review.actions_summary.length > 0) {
      this.like = this.review.actions_summary[0].count
    }
    this.avatar = this.review.avatar_template.replace(/{size}/gi, '90')
  }
}
</script>
