<template>
  <v-layout column>
    <v-flex xs12>
      <div class="container">
        <v-card color="primary" flat dark class="u-clearfix">
          <v-layout row wrap>
            <v-flex xs12 sm6 md4>
              <v-card-text class="card-media">
                <v-img :src="checkUrl(serie.field_poster[0].uri.url)" class="card-media-img"></v-img>
              </v-card-text>
            </v-flex>
            <v-flex xs12 sm6 md8>
              <v-card-title>
                <v-layout row wrap>
                  <v-flex xs12><h1>{{ serie.title }}</h1></v-flex>
                  <v-flex xs12 d-flex>
                    <v-rating style="max-width:200px;" v-model="serieScore"  color="yellow" half-increments readonly></v-rating>
                    <!-- <span class="grey--text text--lighten-2 caption mr-2">({{ serieScore | round(4) }})</span> -->
                  </v-flex>
                </v-layout>
              </v-card-title>
              <span v-if="serie.field_series_type.length > 0">
                <v-btn small nuxt :to="'/series/type/' + type.name" round color="warning" v-for="type in serie.field_series_type" :key="type.id" style="color:black">{{ type.name | escape }}</v-btn>
              </span>
              <span v-if="serie.field_channel.name.length > 0">
                <v-btn small round nuxt :to="'/series/channel/' + serie.field_channel.name" style="padding:0; margin:0">{{ serie.field_channel.name | escape }}</v-btn>
              </span>
              <span v-if="serie.field_serie_year.name.length > 0">
                <v-btn small round nuxt :to="'/series/year/' + serie.field_serie_year.name" style="padding:0; margin:0">{{ serie.field_serie_year.name | escape }}</v-btn>
              </span>
              <v-divider dark></v-divider>
              <v-card-text>
                <v-layout column>
                  <!-- <v-flex xs12 ><p v-html="serie.body.processed"></p></v-flex> -->
                  <v-flex xs12><p v-html="serie.field_synopsis"></p></v-flex>

                  <v-layout row wrap>
                    <v-flex v-if="serie.field_viu !== null">
                      <a :href="serie.field_viu" target="_blank" rel="nofollow">
                        <img class="logo_subthai" src="/viu.png">
                      </a>
                    </v-flex>
                    <v-flex v-if="serie.field_netflix !== null">
                      <a :href="serie.field_netflix" target="_blank" rel="nofollow">
                        <img class="logo_subthai" src="/netflix.png">
                      </a>
                    </v-flex>
                    <v-flex v-if="serie.field_disney !== null">
                      <a :href="serie.field_disney" target="_blank" rel="nofollow">
                        <img class="logo_subthai" src="/disney.png">
                      </a>
                    </v-flex>
                    <v-flex v-if="serie.field_prime !== null">
                      <a :href="serie.field_prime" target="_blank" rel="nofollow">
                        <img class="logo_subthai" src="/prime.png">
                      </a>
                    </v-flex>
                    <v-flex v-if="serie.field_wetv !== null">
                      <a :href="serie.field_wetv" target="_blank" rel="nofollow">
                        <img class="logo_subthai" src="/wetv.png">
                      </a>
                    </v-flex>
                    <v-flex v-if="serie.field_iqiyi !== null">
                      <a :href="serie.field_iqiyi" target="_blank" rel="nofollow">
                        <img class="logo_subthai" src="/iqiyi.png">
                      </a>
                    </v-flex>
                  </v-layout>
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
  <!--  <v-flex xs12>
      <v-flex xs12 class="text-xs-center" v-if="serie.field_viu_widget !== null">
        <viu-widget :vid_id="serie.field_viu_widget" :serie_title="serie.title"></viu-widget>
      </v-flex>
    </v-flex>
  -->
    <v-flex xs12 v-if="serie.field_celeb.length > 0">
      <h2>ดารา นักแสดง {{ serie.title}}</h2>
      <celebs-cast :celebs="serie.field_celeb"></celebs-cast>
    </v-flex><v-flex xs12 v-if="serie.field_web_review !== null">
          <v-card flat>
            <v-card-title><h2>รีวิว {{ serie.title }}</h2></v-card-title>
            <v-card-text><p v-html="serie.field_web_review.processed"></p></v-card-text>
          </v-card>
    </v-flex>
    <!-- <v-flex xs12 v-if="serie.field_episode_series.length > 0">
      <h2>สปอย {{ serie.title }} ทุกตอน</h2>
      <episodes-list :episodes="episodes"></episodes-list>
    </v-flex> -->

    <v-layout row wrap style="margin-top:20px">
      <v-flex xs12 md3 style="padding:20px;">
      <v-card flat dark class="sticky-card">
        <div><v-img :src="checkUrl(serie.field_poster[0].uri.url)"></v-img></div>
        <div style="padding:15px" v-html="serie.body.processed"></div>
      </v-card>
      </v-flex>
      <v-flex xs12 md6>
          <reviews :reviews="reviews"></reviews>
      </v-flex>
      <v-flex xs12 md3>

          <episodes-list :episodes="episodes"></episodes-list>
            <!-- <h2>บทความน่าอ่าน {{ serie.title }}</h2>
            <articles-list :articles="articles"></articles-list> -->

        </v-flex>

    </v-layout>
    <!-- <v-layout row wrap>
      <v-flex xs12 sm8> -->
        <!-- <v-flex xs12>
          <v-card dark>
            <v-card-title><h2>เรื่องย่อ {{ serie.title }}</h2></v-card-title>
            <v-card-text><p v-html="serie.field_synopsis"></p></v-card-text>
          </v-card>
        </v-flex> -->

        <!-- <v-flex xs12 v-if="serie.field_web_review !== null">
          <v-card flat>
            <v-card-title><h2>รีวิว {{ serie.title }}</h2></v-card-title>
            <v-card-text><p v-html="serie.field_web_review.processed"></p></v-card-text>
          </v-card>
        </v-flex> -->


       <!-- <v-flex xs12>
          <h2>รีวิวจากผู้ชม<span v-if="serie.field_topic !== null"> - <a class="hvr-grow warning--text" target="_blank" :href="discourseTopicUrl">โพสท์ในเว็บบอร์ดก็ได้นะ คลิกเลย! <v-icon color="warning">fas fa-external-link-alt</v-icon></a></span></h2>
          <reviews-discourse :reviews="discourseReviews"></reviews-discourse>
        </v-flex> -->
     <!-- <v-flex xs12>
        <h2>รีวิว</h2>
          <reviews :reviews="reviews"></reviews>
        </v-flex>
        <v-flex xs12 v-if="articles.length > 0">
          <h2>บทความน่าอ่าน {{ serie.title }}</h2>
          <articles-list :articles="articles"></articles-list>
        </v-flex>
      </v-flex> -->
  <!--  <v-flex xs12 sm4 class="text-xs-center">
        <celebs-list-vertical :celebs="serie.field_celeb"></celebs-list-vertical>
      </v-flex>
    -->
    <!-- </v-layout> -->

  </v-layout>
</template>

<script>
import CelebsCast from '~/components/series/CelebsCast'
import { getSerieByPath, getSeriesArticlesById, getEpisodesBySerie } from '~/assets/js/api.js'
import ViuWidget from '~/components/series/ViuWidget'
import Reviews from '~/components/reviews/Reviews'
import { voteUpdate, voteResult } from '~/assets/js/api'
import ArticlesList from '~/components/series/ArticlesList'
import CelebsListVertical from '~/components/series/CelebsListVertical'
import EpisodesList from '~/components/episodes/EpisodesList'

export default {
  components: { EpisodesList, CelebsCast, ViuWidget, Reviews, ArticlesList, CelebsListVertical },
  middleware: 'user-auth',
  data () {
    return {
      isAdmin: null,
      baseUrl: process.env.baseUrl
    }
  },
  methods:{
    checkUrl(url) {
      const link = url.split('://')
      if (link[0] !== 'https'){
        return process.env.cdnUrl + url
      } else {
        return url
      }
    }
  },
  head () {
    const canonical = `https://www.kodhit.com${this.$route.path}`
    const synopsis = 'เรื่องย่อ ' + this.serie.title + this.$options.filters.truncate(this.serie.field_synopsis, 150)
    const image = this.checkUrl(this.serie.field_poster[0].uri.url)
    return {
      title: this.serie.title + ' สปอย เรื่องย่อ นักแสดง',
      meta: [
        { hid: 'description', name: 'description', content: synopsis },
        { hid: 'og_type', name: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og_title', name: 'og:title', property: 'og:title', content: 'สปอยล์ เรื่องย่อ ' + this.serie.title },
        { hid: 'og_description', name: 'og:description', property: 'og:description', content: synopsis },
        { hid: 'og_image', name: 'og:image', property: 'og:image', content: image },
        { hid: 'og_url', name: 'og:url', property: 'og:url', content: canonical },
        { hid: 'og_sitename', name: 'og:site_name', property: 'og:site_name', content: 'โคตรฮิต! Kodhit.com' },
        { hid: 'twitter_title', name: 'twitter:title', content: this.serie.title },
        { hid: 'twitter_description', name: 'twitter:description', content: synopsis },
        { hid: 'twitter_image', name: 'twitter:image', content: image },
        { hid: 'twitter_site', name: 'twitter:site', content: '@kodhithd' },
        { hid: 'twitter_creator', name: 'twitter:creator', content: '@kodhithd' },
        { hid: 'twitter_card', name: 'twitter:card', content: 'summary' }
      ],
      link: [
        { rel: 'canonical', href: canonical }
      ]
    }
  },
  mounted () {
    //window.onscroll = () => { return false }
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
  async asyncData ({ app, params, env, store, redirect }) {
    let serie
    try {
      serie = await getSerieByPath(params.title, env)
    } catch (e) {
      redirect('/')
      return 0
    }
    //console.log(serie)
    //const episodes = await getAllEpisodesBySeriesPath(params.title)
    const episodes = await getEpisodesBySerie(serie.id)
    //console.log(episodes)
    // const serie = store.getters['series/getSerie']
    store.dispatch('series/setSerie', serie)
    const reviews = await app.$axios.$get(env.restMongoUrl + '/reviews/' + serie.drupal_internal__nid)
    //console.log('nid', '/vote/serie/result/' + serie.drupal_internal__nid + '?_format=json')
    let serieScore = await voteResult(serie.drupal_internal__nid)
    console.log('score', serieScore)
    if (serieScore.length > 1) {
      serieScore = serieScore[1].value[0].value
    }
    else {
      serieScore = 0
    }
    //console.log('nid', serie.nid)
    //console.log(serie)
    const articles = await getSeriesArticlesById(serie.id)
    //console.log('articles')
    //let have_articles = 0
    //if (typeof(articles) != 'undefined') {
      //console.log('have articles')
    //  have_articles = 1
    //}
    return { serie, reviews, serieScore, episodes, articles }
  },
  async fetch ({ app, params, store }) {
    //await store.dispatch('episodes/setEp', params.title)
    const likeReview = await app.$axios.$get(process.env.restMongoUrl + '/reviews/ip-like')
    store.dispatch('reviews/setIpLike', likeReview)
    const likeReply = await app.$axios.$get(process.env.restMongoUrl + '/reviews/ip-reply-like')
    store.dispatch('reviews/setReplyLike', likeReply)
  }
}
</script>

<style scoped>
.logo_subthai{
  max-width:75px !important;
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
  margin: auto;
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
.sticky-card {
  position: sticky;
  top: 60px;
  z-index: 1;
}

</style>
