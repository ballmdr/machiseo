<template>
  <v-layout columnwrap>
    <series-list></series-list>
  </v-layout>
</template>

<script>
import SeriesList from '~/components/SeriesList'

export default {
  components: {  'series-list': SeriesList },
  async fetch({ store }) {
    if (typeof (store.state.series.series) === 'undefined') {
      await store.dispatch('series/GET_SERIES_LIST')
    }
  }
}
</script>
