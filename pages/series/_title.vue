<template> 
  <v-layout column>
    <v-flex xs12>
      <InfoCard>
        <h1 class="display-2" slot="title">{{ serie[0].title }}</h1>
        <span slot="synopsis">{{ serie[0].synopsis }}</span>
        <span slot="body" v-html="serie[0].body.processed"></span>
        <v-img :src="tmpBaseUrl + serie[0].field_poster[0].url" :aspect-ratio="9/16" slot="img"><div class="fill-height bottom-gradient"></div></v-img>
      </InfoCard>
    </v-flex>
    <v-flex xs12>
      <ReviewCard>

      </ReviewCard>
    </v-flex>
  </v-layout>
</template>

<script>
import InfoCard from '~/components/series/InfoCard'
import ReviewCard from '~/components/series/ReviewCard'
import { findOneSerieByTitle } from '~/assets/js/api'

export default {
  components: { InfoCard, ReviewCard },
  head () {
    return {
      title: this.serie[0].title
    }
  },
  data: () => ({
    tmpBaseUrl: 'http://93.190.138.237',
    reviews: 413,
    value: 4.5
  }),
  /*asyncData ({ store, params }) {
    const serie = store.getters['series/getSerie'](params.title)
    return { serie }
    // store.dispatch('loadCurrentSerie', params.title)
  }*/
  async asyncData ({ params }) {
    const serie = await findOneSerieByTitle(params.title)
    return { serie }
  }

}
</script>
