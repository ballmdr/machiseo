<template> 
  <v-layout column>
    <v-flex xs12> 
      <info-card>
        <h1 class="display-2" slot="title">{{ serie[0].title }}</h1>
        <div slot="tag"><span v-for="(type, i) in serie[0].field_series_type" :key="i">{{ type.name }}&nbsp;</span></div>
        <span slot="synopsis">{{ serie[0].field_synopsis }}</span>
        <span slot="body" v-html="serie[0].body.processed"></span>
        <v-img slot="poster" :src="baseUrl + serie[0].field_poster[0].url" :aspect-ratio="9/16"> 
          <v-layout
            slot="placeholder"
            fill-height
            align-center
            justify-center
            ma-0
          >
            <v-progress-circular indeterminate color="purple"></v-progress-circular>
          </v-layout></v-img>
      </info-card>
    </v-flex>
    <v-flex xs12>
      <rating-card></rating-card>
    </v-flex>
    <v-flex xs12>
    <!--  <celebs-list :celebs="celebs"></celebs-list> -->
    </v-flex>
   <!-- <v-flex xs12>
      <v-layout row wrap>
        <v-flex d-flex xs4 v-for="(review, i) in reviews" :key="i" style="cursor:pointer">
          <ReviewCard :review="review" :user="users[i]" />
        </v-flex>
      </v-layout>
    </v-flex> -->
    <v-flex xs12>
    <!--  <episodes-list :episodes="episodes"></episodes-list>-->
    </v-flex>
  </v-layout>
</template>

<script>
import InfoCard from '~/components/series/InfoCard'
import RatingCard from '~/components/series/RatingCard'
import ReviewCard from '~/components/series/ReviewCard'
import EpisodesList from '~/components/episodes/EpisodesList'
import CelebsList from '~/components/celebs/CelebsList'
import { getSerieById } from '~/assets/js/api'

export default {
  components: { InfoCard, RatingCard, ReviewCard, EpisodesList,CelebsList },
  data () {
    return {
      baseUrl: process.env.baseUrl
    }
  },
  head () {
    return {
      title: this.serie[0].title
    }
  },
  async asyncData ({ params }) {
    const serie = await getSerieById(params.id)
    console.log(serie)
    return { serie }
    //return { serie, celebs, episodes }
  }
}
</script>
