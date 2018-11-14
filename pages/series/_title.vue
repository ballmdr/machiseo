<template> 
  <v-layout column>
    <v-flex xs12> 
      <div class="container">
        <v-card color="primary" class="u-clearfix">
          <v-layout row wrap>
            <v-flex xs12 sm6 md4>
              <v-card-text class="card-media">
                <v-img :src="baseUrl + serie.field_poster[0].url" class="card-media-img"></v-img>
              </v-card-text>
            </v-flex>
            <v-flex xs12 sm6 md8>
              <v-card-title>
                <h1>{{ serie.title }}</h1>
              </v-card-title>
              <v-btn small nuxt :to="'/series/type/' + type.name" round color="warning" v-for="type in serie.field_series_type" :key="type.id" style="color:black">{{ type.name }}</v-btn>
              <v-btn small round nuxt :to="'/series/channel/' + serie.field_channel.name" style="padding:0; margin:0">{{ serie.field_channel.name }}</v-btn>
              <v-btn small round nuxt :to="'/series/year/' + serie.field_serie_year.name" style="padding:0; margin:0">{{ serie.field_serie_year.name }}</v-btn>
              <v-divider dark></v-divider>
              <v-card-text>
                <p v-html="serie.body.processed"></p>
                <h2>ดูซับไทยที่</h2><img style="max-width:170px;margin-top:-20px;margin-left:30px;" :src="baseUrl + '/sites/default/files/viu_logo_new.png'" />
              </v-card-text>
            </v-flex>
            <v-flex xs12 v-if="serie.field_trailor !== null">
              <serie-trailors :trailors="serie.field_trailor"></serie-trailors>
            </v-flex>
          </v-layout>
        </v-card>
      </div>
    </v-flex>
    <v-flex xs12>
      <h2>ดารานักแสดง</h2>
      <celebs-cast :celebs="serie.field_celeb"></celebs-cast>
    </v-flex>
    <v-layout row wrap>
      <v-flex xs12 sm8>
        <v-flex xs12 v-if="serie.field_web_review !== null">
          <v-card color="primary">
            <v-card-title><h2>รีวิวจากเว็บ</h2></v-card-title>
            <v-card-text><p v-html="serie.field_web_review.processed"></p></v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card dark>
            <v-card-title><h2>เรื่องย่อ {{ serie.title }}</h2></v-card-title>
            <v-card-text v-text="serie.field_synopsis"></v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 v-if="serie.field_episode_series.length > 0">
          <h2>สปอยด์รายตอน</h2>
          <episodes-list  :uuid="serie.uuid"></episodes-list>
        </v-flex>
        <v-flex xs12>
          <h2>รีวิวจากผู้ชม<span v-if="serie.field_topic !== null"> - <a class="hvr-grow warning--text" target="_blank" :href="discourseTopicUrl">โพสท์ในเว็บบอร์ดก็ได้นะ คลิกเลย! <v-icon color="warning">fas fa-external-link-alt</v-icon></a></span></h2>
          <reviews-discourse :reviews="discourseReviews"></reviews-discourse>
        </v-flex>
      </v-flex>
      <v-flex xs12 sm8>
        Sidebar
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import RatingCard from '~/components/series/RatingCard'
import EpisodesList from '~/components/episodes/EpisodesList'
import CelebsCast from '~/components/series/CelebsCast'
import { getSerieByPath } from '~/assets/js/api'
import ReviewsDiscourse from '~/components/discourse/ReviewsDiscourse'
import SerieTrailors from '~/components/series/SerieTrailors'

export default {
  components: { RatingCard, EpisodesList, CelebsCast, ReviewsDiscourse, SerieTrailors },
  data () {
    return {
      discourseReviews: [],
      discourseTopicUrl: null,
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
    if (this.serie.field_topic !== null) {
      const tmpHeaders = this.$axios.defaults.headers
      this.$axios.defaults.headers = {
        "Accept": "application/json"
      }
      this.$axios.$get(process.env.discourseUrl + '/t/' + this.serie.field_topic + '/posts.json')
        .then(res => {
          this.discourseReviews = res.post_stream.posts
          this.discourseReviews.splice(0,1)
          this.discourseTopicUrl = process.env.discourseUrl + '/t/' + this.discourseReviews[0].topic_slug + '/' + this.discourseReviews[0].topic_id
          this.$axios.defaults.headers = tmpHeaders
        })
        .catch(err => {
          console.log('err', err.response.data)
        })
    }
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
  margin-top:50px;
  width: 100%;
  border-radius: 12px;
  margin-left: 10px;
}
</style>