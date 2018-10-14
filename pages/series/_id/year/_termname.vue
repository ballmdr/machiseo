<template>
<v-layout row wrap justified-center>
  <v-flex xs12 sm6 md5 lg4 v-for="serie in series" :key="serie.id">
      <serie-card :serie="serie"></serie-card>
  </v-flex>
</v-layout>
</template>

<script>
import SerieCard from '~/components/series/SerieCard'

export default {
  layout: 'browse',
  components: { SerieCard },
  async asyncData({ app, params }) {
    const series = await app.$axios.$get('/series/term/' + params.id + '?_format=json', { auth: { username: process.env.userDrupal, password: process.env.passDrupal }})
    return { series }
  }
}
</script>
