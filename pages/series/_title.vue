<template> 
<v-container fluid grid-list-lg>
  <v-layout column>
    <InfoCard :serie="serie" />
  </v-layout>
</v-container>
</template>

<script>
import InfoCard from '~/components/series/InfoCard'

export default {
  components: { InfoCard },
  async fetch ({ store, params }) {
    await store.dispatch('serie/GET_SERIE', params.title)
  },
  async asyncData ({ app, params }) {
    const url = '/jsonapi/series?filter[title]=' + params.title + '&include=field_poster'
    let res = await app.$axios.$get(url)
    let serie = []
    serie.title = res.data[0].attributes.title
    serie.poster = process.env.baseUrl + res.included[0].attributes.url
    serie.body = res.data[0].attributes.body.processed
    serie.synopsis = res.data[0].attributes.field_synopsis
    return { serie }
  }
}
</script>
