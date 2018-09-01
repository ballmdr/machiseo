<template>
  <v-layout column wrap>
    <SeriesList :series="series" />
  </v-layout>
</template>

<script>
import api from '~/assets/js/api.js'
import SeriesList from '~/components/SeriesList'

export default {
  components: { SeriesList },
  async asyncData ({ app }) {
    let series = await api.getSeriesCard(app, '/jsonapi/series?sort=-nid&page[limit]=10')
    return { series }
  }
}
</script>
