<template> 
  <v-layout column>
    <v-flex xs12 class="text-xs-center"><adsbygoogle /></v-flex>
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
                <v-rating v-model="serieScore" color="yellow" half-increments readonly large></v-rating>{{ serieScore }}
              </v-card-title>
              <v-btn small nuxt :to="'/series/type/' + type.name" round color="warning" v-for="type in serie.field_series_type" :key="type.id" style="color:black">{{ type.name }}</v-btn>
              <v-btn small round nuxt :to="'/series/channel/' + serie.field_channel.name" style="padding:0; margin:0">{{ serie.field_channel.name }}</v-btn>
              <v-btn small round nuxt :to="'/series/year/' + serie.field_serie_year.name" style="padding:0; margin:0">{{ serie.field_serie_year.name }}</v-btn>
              <v-divider dark></v-divider>
              <v-card-text>]
                <v-layout column>   
                  <v-flex xs12><p v-html="serie.body.processed"></p></v-flex>
                  <v-flex xs12 v-if="serie.field_viu !== null" style="margin-top:-40px;">
                    <div style="font-size:26px;">ดูซับไทยที่</div>
                    <a :href="serie.field_viu" target="_blank" rel="nofollow">
                      <img style="max-width:170px;margin-top:-20px;margin-left:30px;" :src="baseUrl + '/sites/default/files/viu_logo_new.png'">
                    </a>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-flex>
            <!--<v-flex xs12 v-if="serie.field_trailor !== null">
              <serie-trailors :trailors="serie.field_trailor"></serie-trailors>
            </v-flex>-->
          </v-layout>
        </v-card>
      </div>
    </v-flex>
    <v-flex xs12 class="text-xs-center" v-if="serie.field_viu_widget !== null">
      <viu-widget :vid_id="serie.field_viu_widget" :serie_title="serie.title"></viu-widget>
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
            <v-card-text><p v-text="serie.field_synopsis"></p></v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 v-if="serie.field_episode_series.length > 0">
          <h2>สปอยด์รายตอน</h2>
          <episodes-list></episodes-list>
        </v-flex>
       <!-- <v-flex xs12>
          <h2>รีวิวจากผู้ชม<span v-if="serie.field_topic !== null"> - <a class="hvr-grow warning--text" target="_blank" :href="discourseTopicUrl">โพสท์ในเว็บบอร์ดก็ได้นะ คลิกเลย! <v-icon color="warning">fas fa-external-link-alt</v-icon></a></span></h2>
          <reviews-discourse :reviews="discourseReviews"></reviews-discourse>
        </v-flex> -->
        <v-flex xs12>
          <h2>รีวิวจากผู้ชม</h2>
          <reviews :reviews="reviews"></reviews>
        </v-flex>
      </v-flex>
      <v-flex xs12 sm4 class="text-xs-center"><adsbygoogle /></v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import EpisodesList from '~/components/episodes/EpisodesList'
import CelebsCast from '~/components/series/CelebsCast'
import { getSerieByPath } from '~/assets/js/api'
import ViuWidget from '~/components/series/ViuWidget'
import Reviews from '~/components/reviews/Reviews'
import { voteUpdate, voteResult } from '~/assets/js/api'

export default {
  components: { EpisodesList, CelebsCast, ViuWidget, Reviews },
  middleware: 'user-auth',
  data () {
    return {
      baseUrl: process.env.baseUrl,
      isAdmin: null
    }
  },
  head () {
    const canonical = `https://www.machiseo.com${this.$route.path}`
    const synopsis = 'เรื่องย่อ : ' + this.$options.filters.truncate(this.serie.field_synopsis, 150)
    return {
      title: this.serie.title,
      meta: [
        { hid: 'description', name: 'description', content: synopsis },
        { hid: 'og_type', name: 'og:type', content: 'article' },
        { hid: 'og_title', name: 'og:title', content: this.serie.title + ' - มาชิสซอ' },
        { hid: 'og_description', name: 'og:description', content: synopsis },
        { hid: 'og_image', name: 'og:image', content: this.baseUrl + this.serie.field_poster[0].url },
        { hid: 'og_url', name: 'og:url', content: canonical },
        { hid: 'og_sitename', name: 'og:site_name', content: 'มาชิสซอ Machiseo.com' },
        { hid: 'twitter_title', name: 'twitter:title', content: this.serie.title },
        { hid: 'twitter_description', name: 'twitter:description', content: synopsis },
        { hid: 'twitter_image', name: 'twitter:image', content: this.baseUrl + this.serie.field_poster[0].url },
        { hid: 'twitter_site', name: 'twitter:site', content: '@machiseo' },
        { hid: 'twitter_creator', name: 'twitter:creator', content: '@machiseo' }
      ],
      link: [
        { rel: 'canonical', href: canonical }
      ]
    }
  },
  mounted () {
    console.log(this.serie)
    window.onscroll = () => { return false }
    // console.log('serie2', this.serie2)
    /* if (this.serie.field_topic !== null) {
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
    } */
  },
  async asyncData ({ app, params, env, store }) {
    const serie = await getSerieByPath(params.title, env)
    // const serie = store.getters['series/getSerie']
    store.dispatch('series/setSerie', serie)
    const reviews = await app.$axios.$get(env.restMongoUrl + '/reviews/' + serie.nid)
    //console.log('nid', '/vote/serie/result/' + serie.nid + '?_format=json')
    let serieScore = await voteResult(serie.nid)
    if (serieScore.length > 1) {
      serieScore = serieScore[1].value[0].value 
    }
    else {
      serieScore = 0
    }
    return { serie, reviews, serieScore }
  },
  async fetch ({ app, params, store }) {
    await store.dispatch('episodes/setEp', params.title)
    const likeReview = await app.$axios.$get(process.env.restMongoUrl + '/reviews/ip-like')
    store.dispatch('reviews/setIpLike', likeReview)
    const likeReply = await app.$axios.$get(process.env.restMongoUrl + '/reviews/ip-reply-like')
    store.dispatch('reviews/setReplyLike', likeReply)
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