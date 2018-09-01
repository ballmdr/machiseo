<template>
  <v-layout column wrap>
    <SeriesList />
  </v-layout>
</template>

<script>
import api from '~/assets/js/api.js'
import SeriesList from '~/components/SeriesList'

export default {
  components: { SeriesList },
  async fetch ({ store }) {
    if (typeof (store.state.series.series) === 'undefined') {
      await store.dispatch('series/GET_SERIES_LIST')
    }
  }
}
</script>
