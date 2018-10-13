<template>
  <v-layout row wrap>
    <v-flex v-for="serie in series" :key="serie.id">
      <serie-card :serie="serie"></serie-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SerieCard from '~/components/series/SerieCard'

export default {
  components: { SerieCard },
  data () {
    return {

    }
  },
  async asyncData({ app }) {
    const series = await app.$axios.$get('/series?_format=json', { auth: { username: process.env.userDrupal, password: process.env.passDrupal }})
    return { series }
  }
}
</script>
