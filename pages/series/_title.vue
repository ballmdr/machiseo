<template> 
  <v-layout column>
    <v-flex xs12> 
      <info-card :serie="serie"></info-card>
    </v-flex>
    <v-flex xs12>
      <celebs-list :celebs="celebs"></celebs-list>
    </v-flex>
   <!-- <v-flex xs12>
      <v-layout row wrap>
        <v-flex d-flex xs4 v-for="(review, i) in reviews" :key="i" style="cursor:pointer">
          <ReviewCard :review="review" :user="users[i]" />
        </v-flex>
      </v-layout>
    </v-flex> -->
    <v-flex xs12>
      <episodes-list :episodes="episodes"></episodes-list>
    </v-flex>
  </v-layout>
</template>

<script>
import InfoCard from '~/components/series/InfoCard'
import ReviewCard from '~/components/series/ReviewCard'
import { getSerieByTitle } from '~/assets/js/api'
import EpisodesList from '~/components/episodes/EpisodesList'
import CelebsList from '~/components/celebs/CelebsList'

export default {
  components: { 
    'info-card': InfoCard, 
    ReviewCard, 
    'episodes-list': EpisodesList,
    'celebs-list': CelebsList
  },
  head () {
    return {
      title: this.serie.title
    }
  },
  async asyncData ({ params }) {
    const data = await getSerieByTitle(params.title)
    console.log(data)
    const serie = {
      title: data[0].title,
      synopsis: data[0].field_synopsis,
      body: data[0].body.processed,
      posters: data[0].field_poster,
      trailors: data[0].field_trailor,
      otherImgs: data[0].field_other_img
    }
    const len = data[0].field_celeb.length
    const celebs = []
    for (let i = 0;i < len;i ++) {
      const celeb = {
        id: data[0].field_celeb[i].uuid,
        title: data[0].field_celeb[i].title,
        profile: data[0].field_celeb[i].field_celeb_profile.url,
        body: data[0].field_celeb[i].body.processed
      }
      celebs.push(celeb)
    }

    const episodes = data[0].field_episode_series
    return { serie, celebs, episodes }
  }
}
</script>
