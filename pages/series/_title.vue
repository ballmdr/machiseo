<template> 
  <v-layout column>
    <v-flex xs12>
      <InfoCard>
        <h1 class="display-2" slot="title">{{ serie[0].title }}</h1>
        <span slot="synopsis">{{ serie[0].field_synopsis }}</span>
        <span slot="body" v-html="serie[0].body.processed"></span>
        <v-img :src="tmpBaseUrl + serie[0].field_poster[0].url" :aspect-ratio="9/16" slot="img"><v-layout
                      slot="placeholder"
                      fill-height
                      align-center
                      justify-center
                      ma-0
                    >
                      <v-progress-circular indeterminate color="purple"></v-progress-circular>
                    </v-layout><div class="fill-height bottom-gradient"></div></v-img>
      </InfoCard>
    </v-flex>
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex d-flex xs4 v-for="(review, i) in reviews" :key="i">
          <ReviewCard :review="review" :user="users[i]" />
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import InfoCard from '~/components/series/InfoCard'
import ReviewCard from '~/components/series/ReviewCard'
import { findOneSerieByTitle, getAllReviewBySerie, getUserById } from '~/assets/js/apiWaterwheel'
import { getRecentCommentFromSerie } from '~/assets/js/drupalRest'

export default {
  components: { InfoCard, ReviewCard },
  head () {
    return {
      title: this.serie[0].title
    }
  },
  data: () => ({
    tmpBaseUrl: process.env.baseUrl,
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
    const tempReviews = await getRecentCommentFromSerie(serie[0].id)
    const len = tempReviews.length
    // console.log(tempReviews)
    let users = []
    let reviews = []
    let j = 0
    for (let i = 0; i < len; i++) {
      const tmp = tempReviews[i].thread[0].value.split('.')
      // console.log(tmp)
      if (tmp.length === 1) {
        reviews[j] = tempReviews[i]
        users[j] = await getUserById(tempReviews[i].uid[0].target_uuid)
        j++
      }
    }
    return { serie, reviews, users }
  }
}
</script>
