<template> 
  <v-layout column>
    <v-flex xs12> 
      <div class="container">
        <v-card color="primary" class="u-clearfix">
          <v-layout row wrap>
            <v-flex xs4 d-flex>
              <v-card-text class="card-media">
                <v-img :src="baseUrl + serie.field_poster[0].url" class="card-media-img"></v-img>
              </v-card-text>
            </v-flex>
            <v-flex xs7>
              <v-card-title>
                <h1 class="display-2 font-weight-bold">{{ serie.title }}</h1>
                <v-chip color="warning" v-for="(type, index) in serie.field_series_type" :key="index"><strong>{{ type.name }}</strong></v-chip>
              </v-card-title>
              <v-divider dark></v-divider>
              <v-card-text>
                <p v-html="serie.body.processed"></p>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </div>
      <v-spacer></v-spacer>
    </v-flex>
    <v-flex xs12>
      <v-layout row wrap justify-start>
        <v-flex xs5 sm4 md3 lg2 v-for="celeb in serie.field_celeb" :key="celeb.id" class="text-xs-center hvr-grow-shadow">
          <celebs-cast :celeb="celeb"></celebs-cast>
        </v-flex>
      </v-layout> 
    </v-flex>
    <v-flex xs12>
      <v-card dark><v-card-text><div class="">{{ serie.field_synopsis }}</div></v-card-text></v-card>
      <!-- <episodes-list :episodes="episodes"></episodes-list>  -->
    </v-flex>
  </v-layout>
</template>

<script>
import RatingCard from '~/components/series/RatingCard'
import EpisodesList from '~/components/episodes/EpisodesList'
import CelebsCast from '~/components/series/CelebsCast'
import { getSerieByPath } from '~/assets/js/api'

export default {
  components: { RatingCard, EpisodesList, CelebsCast },
  data () {
    return {
      baseUrl: process.env.baseUrl
    }
  },
  head () {
    return {
      title: this.serie.title
    }
  },
  mounted() {
    window.onscroll = () => { return false }
  },
  async asyncData ({ params, env }) {
    const serie = await getSerieByPath(params.title, env)
    return { serie }
  }
}
</script>

<style scoped>
.u-clearfix:before,
.u-clearfix:after {
  content: " ";
  display: table;
}

.u-clearfix:after {
  clear: both;
}

.u-clearfix {
  *zoom: 1;
}

.container {
  margin: 25px auto;
  width: 100%;
}

.card-media {
  padding: 0 0 25px 25px;
  width: 300px;
}

.card-media-img {
  box-shadow: 0 4px 6px rgba(0, 0, 0, .3);
  margin-top: -50px;
  width: 100%;
}
</style>