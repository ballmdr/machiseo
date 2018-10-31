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
                <div v-if="serie.field_viu !== null"><h2 style="margin:auto">ดูซับไทยที่</h2>
                  <a :href="serie.field_viu" rel="nofollow" target="_blank"><v-img style="width:120px;cursor:pointer;" :src="baseUrl + '/sites/default/files/logo_viu_nav-crop.png'"></v-img></a>
                </div>
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
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="celeb in serie.field_celeb" :key="celeb.id">
            <celebs-cast :celeb="celeb"></celebs-cast>
          </div>
        </div>
      </div>
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
            <v-card-text><div class="">{{ serie.field_synopsis }}</div></v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 v-if="serie.field_episode_series.length > 0">
          <h2>สปอยด์รายตอน</h2>
          <episodes-list  :uuid="serie.uuid"></episodes-list>
        </v-flex>
        <v-flex xs12>
          <h2>รีวิวจากผู้ชม</h2>
          <reviews :reviewSerie="reviewSerie"></reviews>
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
import Reviews from '~/components/reviews/Reviews'
import SerieTrailors from '~/components/series/SerieTrailors'

export default {
  components: { RatingCard, EpisodesList, CelebsCast, Reviews, SerieTrailors },
  data () {
    return {
      baseUrl: process.env.baseUrl,
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 50,
        // init: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      }
    }
  },
  head () {
    return {
      title: this.serie.title
    }
  },
  mounted() {
    window.onscroll = () => { return false }
    console.log('serie', this.serie)
  },
  async asyncData ({ params, env }) {
    const serie = await getSerieByPath(params.title, env)
    const reviewSerie = {
      uuid: serie.uuid,
      nid: serie.nid,
      poster: serie.field_poster[0].url,
      path: serie.path.alias
    }
    return { serie, reviewSerie }
  }
}
</script>

<style scoped>
.logo .viu {
  width: 200px;
}
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