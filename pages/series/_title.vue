<template> 
  <v-layout column>
    <v-flex xs12> 
      <InfoCard>
        <h1 class="display-2" slot="title">{{ serie[0].title }}</h1>
        <span slot="synopsis">{{ serie[0].field_synopsis }}</span>
        <span slot="body" v-html="serie[0].body.processed"></span>
        <div @click="getClick()" slot="img" style="cursor:pointer">
         <!-- <v-carousel hide-delimiters hide-controls interval="3000">
            <v-carousel-item
              v-for="(item,i) in serie[0].field_poster"
              :key="i"
              :src="tmpBaseUrl + item.url"
              transition="fade"
              width="100%"
            ></v-carousel-item>
          </v-carousel> -->
          <v-img :src="tmpBaseUrl + serie[0].field_poster[0].url" :aspect-ratio="9/16" slot="img">
          <v-layout
            slot="placeholder"
            fill-height
            align-center
            justify-center
            ma-0
          >
            <v-progress-circular indeterminate color="purple"></v-progress-circular>
          </v-layout></v-img>
        </div>
      </InfoCard>
    </v-flex>
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex d-flex xs4 v-for="(review, i) in reviews" :key="i" style="cursor:pointer">
          <ReviewCard :review="review" :user="users[i]" />
        </v-flex>
      </v-layout>
    </v-flex>
      <v-dialog v-model="dialog"
          hide-overlay
          transition="dialog-bottom-transition"
          scrollable
          max-width="800" @closeDialog="dialog = false">
            <v-card dark flat>
    <v-toolbar card dark color="primary">
              <v-btn icon dark @click="closeDialog()">
                <v-icon>close</v-icon>
              </v-btn>
              </v-toolbar>
              <InfoCardPoster :trailors="serie[0].field_trailor" :otherImgs="serie[0].field_other_img"></InfoCardPoster>
            </v-card>
      </v-dialog>
  </v-layout>
</template>

<script>
import InfoCard from '~/components/series/InfoCard'
import ReviewCard from '~/components/series/ReviewCard'
import { findOneSerieByTitle, getAllReviewBySerie, getUserById } from '~/assets/js/apiWaterwheel'
import { getRecentCommentFromSerie } from '~/assets/js/drupalRest'
import InfoCardPoster from '~/components/series/InfoCardPoster'

export default {
  components: { InfoCard, ReviewCard, InfoCardPoster },
  head () {
    return {
      title: this.serie[0].title
    }
  },
  data: () => ({
    tmpBaseUrl: process.env.baseUrl,
    reviews: 413,
    value: 4.5,
    dialog: false
  }),
  methods: {
    getClick () {
      this.dialog = true
    },
    closeDialog () {
      this.dialog = false
    }
  },
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
