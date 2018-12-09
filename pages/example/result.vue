<template>
  <v-container>
  <v-layout row v-for="vote in votes" :key="vote._id">
    <v-flex d-flex xs8>
      <v-flex xs3 v-for="serie in vote.series" :key="serie._id">
        <v-img :src="baseUrl + serie.poster"></v-img>
      </v-flex>
    </v-flex>
    <v-flex xs4>
      {{ vote.author }}
    </v-flex>
  </v-layout>
  </v-container>
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
