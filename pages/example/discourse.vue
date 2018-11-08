<template>
  <div>
    <v-card v-for="post in posts" :key="post.id">
      <v-card-text v-html="post.cooked"></v-card-text>
      <v-card-text>- {{ post.username }} -</v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      posts: []
    }
  },
  mounted() {
    this.$axios.$get('http://forums.machiseo.com/t/23.json')
      .then(res => {
        console.log('res', res)
        this.posts = res.post_stream.posts
        this.posts.splice(0,1)
      })
      .catch(err => {
        console.log('err', err)
      })
  }
}
</script>
