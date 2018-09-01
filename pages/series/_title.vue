<template> 
<v-container fluid grid-list-lg>
  <v-layout column>
    <InfoCard>
      <h1 class="display-2" slot="title">{{ serie.title }}</h1>
      <span slot="synopsis">{{ serie.synopsis }}</span>
      <span slot="body" v-html="serie.body"></span>
      <v-img :src="serie.poster" :aspect-ratio="9/16" slot="img"><div class="fill-height bottom-gradient"></div></v-img>
    </InfoCard>
  </v-layout>
</v-container>
</template>

<script>
import InfoCard from '~/components/series/InfoCard'
import api from '~/assets/js/api'

export default {
  components: { InfoCard },
  head () {
    return {
      title: this.serie.title
    }
  },
  data: () => ({
    reviews: 413,
    value: 4.5
  }),
  asyncData ({ store, params }) {
    const serie = store.getters['series/getSerie'](params.title)
    return { serie }
    // store.dispatch('loadCurrentSerie', params.title)
  }
}
</script>
