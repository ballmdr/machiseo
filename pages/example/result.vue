<template>
  <v-layout column>
    <v-flex d-flex xs12 v-for="vote in votes" :key="vote._id">
      <v-card>
        <v-toolbar dense color="warning" style="color:black">โหวตโดย {{ vote.author }}</v-toolbar>
        <v-card-text>
          <v-layout row>
            <v-flex xs3 v-for="serie in vote.series" :key="serie._id">
              <v-img style="border-radius:15px;" max-height="200" max-width="150" :src="baseUrl + serie.poster"></v-img>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      baseUrl: process.env.baseUrl
    }
  },
  mounted() {
    console.log('all vote', this.votes)
  },
  async asyncData ({ app, env }) {
    const votes = await app.$axios.$get(env.voteServer + '/vote/result/list')
    return { votes }
  }
}
</script>
