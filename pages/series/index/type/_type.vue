<template>
  <v-layout row wrap justify-center>
    <v-flex xs12>
      <v-alert
        :value="true"
        color="warning"
      >
      <h1 class="headline" style="color:black">ซีรีส์เกาหลี แนว{{ $route.params.type }}</h1>
      </v-alert>
    </v-flex>
    <v-flex xs12 sm6 md5 lg4 v-for="serie in series" :key="serie.id">
      <serie-card :serie="serie"></serie-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { getSeriesByTerm } from '~/assets/js/api'
import SerieCard from '~/components/series/SerieCard'

export default {
  components: { SerieCard },
  async asyncData ({ params }) {
    const series = await getSeriesByTerm(params.type)
    return { series }
  }
}
</script>